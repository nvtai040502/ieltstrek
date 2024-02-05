"use client";
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

export default function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  );
}
