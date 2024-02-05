"use client";
import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import { Editor, createEditor } from "slate";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string, bold?: boolean };

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
  const [isToolbarVisible, setToolbarVisibility] = useState(false);
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  const CustomEditor = {
    isBoldMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor)
      return marks ? marks.bold === true : false
    },

    toggleBoldMark(editor: BaseEditor & ReactEditor ) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'bold')
      } else {
        Editor.addMark(editor, 'bold', true)
      }
    },
  
    
  }
  const initialValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar isVisible={isToolbarVisible} editor={editor} />
      <Editable
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor)
              break;
            }
          }
        }}
      />
    </Slate>
  );
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
const Toolbar: React.FC<{ isVisible: boolean; editor: BaseEditor & ReactEditor }> = ({ isVisible, editor }) => {
  // const handleBoldClick = () => {
  //   CustomEditor.toggleBoldMark(editor);
  // };

  return isVisible ? (
    <div style={{ position: "absolute", top: "0", left: "0" }}>
      <button>Bold</button>
      {/* Add more toolbar options as needed */}
    </div>
  ) : null;
};