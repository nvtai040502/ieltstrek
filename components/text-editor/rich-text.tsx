"use client";
import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Button } from "@/components/ui/button";
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

const RichTextExample = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <MarkButton format="bold" icon={<Bold />} />
      <MarkButton format="italic" icon={<Italic />} />
      <MarkButton format="underline" icon={<Underline />} />
      <MarkButton format="code" icon={<Code />} />
      <BlockButton format="heading-one" icon={<Heading1 />} />
      <BlockButton format="heading-two" icon={<Heading2 />} />
      <BlockButton format="block-quote" icon={<Quote />} />
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

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote className="mt-6 border-l-2 pl-6 italic" {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          {...attributes}
        >
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code className="bg-red-500">{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
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
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export default RichTextExample;
