'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { updateMatchingParagraph } from '@/actions/question-type/matching';
import { Element, Transforms, createEditor } from 'slate';
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
import { CustomEditor, CustomElement, CustomText } from '@/types/text-editor';
import { catchError, countBlankOccurrences } from '@/lib/utils';
import { ElementRender } from '@/components/common/text-editor/element-render';
import { LeafRender } from '@/components/common/text-editor/leaf-render/leaf-render';
import Toolbar from '@/components/common/text-editor/toolbar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContentWithScrollArea
} from '@/components/ui/dialog';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const MatchingParagraphUpdateForm = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <ElementRender slateProps={props} type="Matching" mode="edit" />
    ),
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRender {...props} />,
    []
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const [isPending, startTransition] = useTransition();
  const isModalOpen = isOpen && type === 'editMatchingSentence';
  const questionGroup = data?.questionGroup;
  const matching = data?.questionGroup?.matching;
  const editor = useMemo(
    () => withInline(withHistory(withReact(createEditor()))),
    []
  );
  if (!questionGroup || !matching || !isModalOpen) {
    return null;
  }

  const handleSave = async () => {
    const blankCount = countBlankOccurrences({
      editor,
      startQuesNum: questionGroup.startQuestionNumber
    });
    const totalQuestions =
      questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1;
    if (blankCount !== totalQuestions) {
      toast.error(
        `Total Blank must be equal to number question you set in question group
        Total Blank: ${blankCount}, Total Questions: ${totalQuestions} `
      );
      return;
    }
    startTransition(async () => {
      try {
        await updateMatchingParagraph({
          id: matching.id,
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
        <Slate editor={editor} initialValue={JSON.parse(matching.paragraph)}>
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

export default MatchingParagraphUpdateForm;

const withInline = (editor: CustomEditor) => {
  const { isInline } = editor;

  editor.isInline = (element) =>
    ['blank'].includes(element.type) || isInline(element);

  return editor;
};
