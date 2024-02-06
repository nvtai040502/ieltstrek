"use client";
import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import {
  createEditor,
  Descendant,
} from "slate";
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

const RichText = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRender {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRender {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
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

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
            }
          }
        }}
      />
    </Slate>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "blockquote",
    children: [{ text: "A wise quote." }, { text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export default RichText;
