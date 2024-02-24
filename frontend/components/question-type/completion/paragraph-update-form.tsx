'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { updateCompletionParagraph } from '@/actions/question-type/completion';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';
import { toast } from 'sonner';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError, countBlankOccurrences, withInline } from '@/lib/utils';
import { ElementRender } from '@/components/common/text-editor/element-render';
import { LeafRender } from '@/components/common/text-editor/leaf-render/leaf-render';
import Toolbar from '@/components/common/text-editor/toolbar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContentWithScrollArea
} from '@/components/ui/dialog';

const CompletionParagraphUpdateForm = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <ElementRender slateProps={props} type="Completion" mode="edit" />
    ),
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRender {...props} />,
    []
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const [isPending, startTransition] = useTransition();
  const isModalOpen = isOpen && type === 'editCompletionParagraph';
  const questionGroup = data?.questionGroup;
  const completion = questionGroup?.completion;
  const editor = useMemo(
    () => withInline(withHistory(withReact(createEditor()))),
    []
  );
  if (!questionGroup || !completion || !isModalOpen) {
    return null;
  }

  const handleSave = async () => {
    const blankCount = countBlankOccurrences({
      editor,
      startQuesNum: questionGroup.startQuestionNumber
    });
    const totalQuestions = completion.questions.length;
    if (blankCount !== totalQuestions) {
      toast.error(
        `Total Blank must be equal to number question you set in question group
        Total Blank: ${blankCount}, Total Questions: ${totalQuestions} `
      );
      return;
    }
    startTransition(async () => {
      try {
        await updateCompletionParagraph({
          id: completion.id,
          paragraph: JSON.stringify(editor.children)
        });
        toast.success('Updated');
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea className="max-w-7xl">
        <Slate editor={editor} initialValue={JSON.parse(completion.paragraph)}>
          <Toolbar />

          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
          />
          <Button disabled={isPending} onClick={handleSave}>
            Save
          </Button>
        </Slate>
        <DialogClose onClick={onClose} />
      </DialogContentWithScrollArea>
    </Dialog>
  );
};

export default CompletionParagraphUpdateForm;
