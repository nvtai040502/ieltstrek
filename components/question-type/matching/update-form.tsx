'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { updateMatchingSentence } from '@/actions/question-type/matching-sentence';
import { Editor, createEditor } from 'slate';
import { Transforms } from 'slate';
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
import { catchError } from '@/lib/utils';
import { EditElementRender } from '@/components/common/text-editor/text-render/element-render';
import { LeafEditorRender } from '@/components/common/text-editor/text-render/leaf-render';
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

const UpdateMatchingSentenceForm = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <EditElementRender props={props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafEditorRender {...props} />,
    []
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const [isPending, startTransition] = useTransition();
  const isModalOpen = isOpen && type === 'editMatchingSentence';
  const questionGroup = data?.questionGroup;
  const matchingSentence = data?.questionGroup?.matchingSentence;
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );
  if (!questionGroup || !matchingSentence || !isModalOpen) {
    return null;
  }

  const countBlankOccurrences = () => {
    let blankCount = 0;

    for (const [node, path] of Editor.nodes(editor, {
      at: [],
      match: (n) => n.type === 'blank'
    })) {
      const { type, ...props } = node;

      const newNode = {
        ...props,
        type,
        questionNumber: questionGroup.startQuestionNumber + blankCount
      };
      blankCount++;
      Transforms.setNodes(editor, { ...newNode }, { at: path });
    }
    return blankCount;
  };
  const handleSave = async () => {
    const blankCount = countBlankOccurrences();
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
        await updateMatchingSentence({
          id: matchingSentence.id,
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
        <Slate
          editor={editor}
          initialValue={JSON.parse(matchingSentence.paragraph)}
        >
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

export default UpdateMatchingSentenceForm;

const withInlines = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) =>
    ['blank'].includes(element.type) || isInline(element);

  return editor;
};
