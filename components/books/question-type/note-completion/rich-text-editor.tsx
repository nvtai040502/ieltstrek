"use client";
import { useCallback, useMemo, useTransition } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { updateNoteCompletion } from "@/actions/books/note-completion";
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
import { toast } from "sonner";
import { Button } from "../../../ui/button";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const RichTextEditor = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRender {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafEditorRender {...props} />,
    [],
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const [isPending, startTransition] = useTransition();
  const isEdit = isOpen && type === "editNoteCompletion";
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const noteCompletion = data?.noteCompletion;
  const router = useRouter();
  if (!noteCompletion) {
    return null;
  }

  const handleSave = async () => {
    const codeCount = countCodeOccurrences();
    if (codeCount !== noteCompletion.blanks.length) {
      toast.error(
        `Total Blank must be equal to number question you set in question group
        Total Blank: ${codeCount}, Total Questions: ${noteCompletion.blanks.length} `,
      );
      return;
    }
    startTransition(async () => {
      try {
        const success = await updateNoteCompletion({
          id: noteCompletion.id,
          paragraph: JSON.stringify(editor.children),
        });

        if (success) {
          toast.success("Update Success");
          router.refresh();
        } else {
          toast.error("Error");
        }
      } catch (error) {
        console.error("Error creating question group:", error);
        toast.error("Failed to create question group.");
      } finally {
        router.refresh();
        onClose();
      }
    });
  };
  const countCodeOccurrences = () => {
    let codeCount = 0;

    const setQuestionNumber = (
      editor: CustomEditor,
      path: number[],
      codeCount: number,
    ) => {
      Transforms.setNodes(
        editor,
        {
          questionNumber:
            noteCompletion.questionGroup.startQuestionNumber + codeCount,
        },
        { at: path },
      );
    };

    const processNode = (node: CustomElement, nodeIndex: number) => {
      if (node.type === "paragraph" || node.type === "table") {
        const traverseChildren = (children: any, path: number[]) => {
          children.forEach((child: any, childIndex: number) => {
            if (child.text && child.code) {
              setQuestionNumber(editor, [...path, childIndex], codeCount++);
            }
            if (child.children) {
              traverseChildren(child.children, [...path, childIndex]);
            }
          });
        };

        traverseChildren(node.children, [nodeIndex]);
      }
    };

    editor.children.forEach((node, nodeIndex) => {
      processNode(node as CustomElement, nodeIndex);
    });

    return codeCount;
  };

  return (
    <Dialog open={isEdit}>
      <DialogContentWithScrollArea className="max-w-7xl">
        <Slate
          editor={editor}
          initialValue={JSON.parse(noteCompletion.paragraph)}
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

export default RichTextEditor;
