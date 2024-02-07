"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Plus,
  PlusCircle,
  Quote,
  Underline,
} from "lucide-react";
import { MarkButton } from "./toolbar/mark-button";
import BlockButton from "./toolbar/block-button";
import { CustomEditor, CustomElement, CustomText } from "@/types/text-editor";
import { ElementRender, LeafRender } from "./text-render";
import { Button } from "../ui/button";
import { EditContext } from "@/global/edit-context";
import { NoteCompletionExtended } from "@/types/db";
import { useEditHook } from "@/global/use-edit-hook";
import { toast } from "sonner";
import { updateNoteCompletion } from "@/actions/books/note-completion";
import { Input } from "../ui/input";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const RichText = ({
  noteCompletion,
}: {
  noteCompletion?: NoteCompletionExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRender {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRender {...props} />,
    []
  );
  const { onClose, data, isOpen, type } = useEditHook();
  const isEdit = isOpen && type === "editNoteCompletion";
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const note = noteCompletion || data?.noteCompletion;

  if (!note) {
    return null;
  }

  const handleSave = async () => {
    const codeCount = countCodeOccurrences();
    if (codeCount !== note.blanks.length) {
      toast.error(
        "Total Blank must be equal to number question you set in question group"
      );
      return;
    }
    const success = await updateNoteCompletion({
      id: note.id,
      paragraph: JSON.stringify(editor.children),
    });
    if (success) {
      toast.success("Update Success");
      onClose();
    } else {
      toast.error("Error");
    }
  };
  const countCodeOccurrences = () => {
    let codeCount = 0;
    // Iterate through the children of the editor
    editor.children.forEach((node) => {
      // If the node is a leaf and its type is "code", increment codeCount
      node.children.forEach((element) => {
        // if (element.text && element.code) {
        if (element.text && element.code) {
          element.questionNumber =
            note.questionGroup.startQuestionNumber + codeCount;
          codeCount++;
        }
        // }
      });
    });
    return codeCount;
  };
  return (
    <Slate editor={editor} initialValue={JSON.parse(note.paragraph)}>
      {isEdit && (
        <div className="flex flex-wrap">
          <MarkButton format="bold" icon={<Bold />} />
          <MarkButton format="italic" icon={<Italic />} />
          <MarkButton format="underline" icon={<Underline />} />
          <MarkButton format="code" icon={<Code />} />
          <BlockButton format="heading-one" icon={<Heading1 />} />
          <BlockButton format="heading-two" icon={<Heading2 />} />
          <BlockButton format="blockquote" icon={<Quote />} />
          <BlockButton format="bulleted-list" icon={<List />} />
          <BlockButton format="numbered-list" icon={<ListOrdered />} />
          <BlockButton format="left" icon={<AlignLeft />} />
          <BlockButton format="center" icon={<AlignCenter />} />
          <BlockButton format="right" icon={<AlignRight />} />
          <BlockButton format="justify" icon={<AlignJustify />} />
        </div>
      )}

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        readOnly={!isEdit}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
            }
          }
        }}
      />
      {isEdit && <Button onClick={handleSave}>Save</Button>}
    </Slate>
  );
};

export default RichText;
