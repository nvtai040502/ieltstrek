"use client";
import { useCallback, useMemo, useTransition } from "react";
import {
  Editor,
  createEditor,
  Element as SlateElement,
  Range as RangeSlate,
} from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
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
import { Plus } from "lucide-react";
import { css } from "@emotion/css";

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
  const matchingSentence = data?.questionGroup?.matchingSentence;
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  );
  const router = useRouter();
  if (!matchingSentence || !isModalOpen) {
    return null;
  }

  const handleSave = async () => {};

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea className="max-w-7xl">
        <Slate
          editor={editor}
          initialValue={JSON.parse(matchingSentence.paragraph)}
        >
          {/* <Toolbar /> */}
          <ToggleEditableButtonButton />
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

const unwrapBlank = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "blank",
  });
};

const wrapButton = (editor) => {
  if (isBlankActive(editor)) {
    unwrapBlank(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && RangeSlate.isCollapsed(selection);
  const blank = {
    type: "blank",
    children: isCollapsed ? [{ text: "Edit me!" }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, blank);
  } else {
    Transforms.wrapNodes(editor, blank, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const ToggleEditableButtonButton = () => {
  const editor = useSlate();
  return (
    <Button
      // active
      onMouseDown={(event) => {
        event.preventDefault();
        if (isBlankActive(editor)) {
          unwrapBlank(editor);
        } else {
          insertBlank(editor);
        }
      }}
    >
      <Plus />
    </Button>
  );
};

const insertBlank = (editor) => {
  if (editor.selection) {
    wrapButton(editor);
  }
};

const isBlankActive = (editor) => {
  const [blank] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "blank",
  });
  return !!blank;
};
