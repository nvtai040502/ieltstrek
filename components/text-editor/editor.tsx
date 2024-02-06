"use client";
import React, { useCallback, useMemo, useState } from "react";
// Import the Slate editor factory.
import { Editor, Transforms, createEditor } from "slate";
import { BaseEditor, Descendant, Node } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { Element } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import SelectableText from "./selected-text";
import { HistoryEditor, withHistory } from "slate-history";
import { Input } from "../ui/input";
import { Range } from "slate";
import { isKeyHotkey } from "is-hotkey";
import { Button } from "../ui/button";

type CustomElement = {
  type: "paragraph" | "link" | "button" | "badge";
  children: CustomText[];
};
type CustomText = {
  text?: string;
  type?: "link" | "button" | "badge";
  url?: string;
  children?: [
    {
      text: string;
    }
  ];
  bold?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const withInlines = (editor: BaseEditor & ReactEditor & HistoryEditor) => {
  const { insertData, insertText, isInline, isElementReadOnly, isSelectable } =
    editor;

  editor.isInline = (element) =>
    ["link", "button", "badge"].includes(element.type) || isInline(element);

  editor.isElementReadOnly = (element) =>
    element.type === "badge" || isElementReadOnly(element);

  editor.isSelectable = (element) =>
    element.type !== "badge" && isSelectable(element);

  editor.insertText = (text) => {
    insertText(text);
  };

  editor.insertData = (data) => {
    insertData(data);
  };

  return editor;
};
export default function TextEditor() {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { selection } = editor;

    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event;
      if (isKeyHotkey("left", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
        return;
      }
      if (isKeyHotkey("right", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset" });
        return;
      }
    }
  };
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  const CustomEditor = {
    isBoldMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.bold === true : false;
    },

    toggleBoldMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "bold");
      } else {
        Editor.addMark(editor, "bold", true);
      }
    },
  };
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [
        {
          text: "In addition to block nodes, you can create inline nodes. Here is a ",
        },
        {
          type: "link",
          url: "https://en.wikipedia.org/wiki/Hypertext",
          children: [{ text: "hyperlink" }],
        },
        {
          text: ", and here is a more unusual inline: an ",
        },
        {
          type: "button",
          children: [{ text: "editable button" }],
        },
        {
          text: "! Here is a read-only inline: ",
        },
        {
          type: "badge",
          children: [{ text: "Approved" }],
        },
        {
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected. ",
        },
        // The following is an example of an inline at the end of a block.
        // This is an edge case that can cause issues.
        {
          type: "link",
          url: "https://twitter.com/JustMissEmma/status/1448679899531726852",
          children: [{ text: "Finally, here is our favorite dog video." }],
        },
        { text: "" },
      ],
    },
  ];
  const MyElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props
    switch (element.type) {
      case 'link':
        return <Input value={"1"}/>
      case 'button':
        return <Button>Hello</Button>
      case 'badge':
        return <Button>Hello</Button>
      default:
        return <p {...attributes}>{children}</p>
    }
  }
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
      </div>
      <SelectableText>
        <Editable
          renderElement={(props) => <MyElement {...props} />}
          // renderLeaf={(props) => <Text {...props} />}
          placeholder="Enter some text..."
          onKeyDown={onKeyDown}
        />
      </SelectableText>
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
