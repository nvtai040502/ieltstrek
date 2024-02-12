"use client";
import { useCallback, useMemo, useTransition } from "react";
import { Editor, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { ElementRender } from "@/components/text-editor/text-render/element-render";
import { LeafEditorRender } from "@/components/text-editor/text-render/leaf-render";
import Toolbar from "@/components/text-editor/toolbar";
import {
  Dialog,
  DialogClose,
  DialogContentWithScrollArea,
} from "@/components/ui/dialog";
import { useEditHook } from "@/global/use-edit-hook";
import { CustomEditor, CustomElement, CustomText } from "@/types/text-editor";
import { useRouter } from "next/navigation";
import { Transforms } from "slate";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const UpdateMatchingSentenceForm = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRender props={props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafEditorRender {...props} />,
    [],
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const [isPending, startTransition] = useTransition();
  const isModalOpen = isOpen && type === "editMatchingSentence";
  const questionGroup = data?.questionGroup;
  const matchingSentence = data?.questionGroup?.matchingSentence;
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  );
  const router = useRouter();
  if (!questionGroup || !matchingSentence || !isModalOpen) {
    return null;
  }

  const countBlankOccurrences = () => {
    let blankCount = 0;

    for (const [node, path] of Editor.nodes(editor, {
      at: [],
      match: (n) => n.type === "blank",
    })) {
      const { type, ...props } = node;

      const newNode = {
        ...props,
        type,
        questionNumber: questionGroup.startQuestionNumber + blankCount,
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
        Total Blank: ${blankCount}, Total Questions: ${totalQuestions} `,
      );
      return;
    }
    // startTransition(async () => {
    //   try {
    //     await updateMatchingS({
    //       title: values.title,
    //       content: values.content,
    //       id: multiHeading.id,
    //     });
    //     toast.success("Updated");
    //     onClose();
    //   } catch (err) {
    //     catchError(err);
    //   }
    // });
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
    ["blank"].includes(element.type) || isInline(element);

  return editor;
};
