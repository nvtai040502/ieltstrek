import React, { useMemo } from "react";
import { css } from "@emotion/css";
import { Editable, withReact, useSlate, useSelected } from "slate-react";
import * as SlateReact from "slate-react";
import {
  Transforms,
  Editor,
  Range,
  createEditor,
  Element as SlateElement,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "In addition to block nodes, you can create inline nodes. Here is a ",
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

      { text: "" },
    ],
  },
];
const InlinesExample = () => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  );

  return (
    <SlateReact.Slate editor={editor} initialValue={initialValue}>
      <ToggleEditableButtonButton />
      <Editable
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Text {...props} />}
        placeholder="Enter some text..."
      />
    </SlateReact.Slate>
  );
};

const withInlines = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) =>
    ["button"].includes(element.type) || isInline(element);

  return editor;
};

const insertButton = (editor) => {
  if (editor.selection) {
    wrapButton(editor);
  }
};

const isButtonActive = (editor) => {
  const [button] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "button",
  });
  return !!button;
};

const unwrapButton = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "button",
  });
};

const wrapButton = (editor) => {
  if (isButtonActive(editor)) {
    unwrapButton(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const button = {
    type: "button",
    children: isCollapsed ? [{ text: "Edit me!" }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, button);
  } else {
    Transforms.wrapNodes(editor, button, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className={css`
      font-size: 0;
    `}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

const EditableButtonComponent = ({ attributes, children }) => {
  return (
    /*
      Note that this is not a true button, but a span with button-like CSS.
      True buttons are display:inline-block, but Chrome and Safari
      have a bad bug with display:inline-block inside contenteditable:
      - https://bugs.webkit.org/show_bug.cgi?id=105898
      - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
      Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
      The only current workaround is to emulate the appearance of a display:inline button using CSS.
    */
    <span
      {...attributes}
      onClick={(ev) => ev.preventDefault()}
      // Margin is necessary to clearly show the cursor adjacent to the button
      className={css`
        margin: 0 0.1em;

        background-color: #efefef;
        padding: 2px 6px;
        border: 1px solid #767676;
        border-radius: 2px;
        font-size: 0.9em;
      `}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </span>
  );
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "button":
      return <EditableButtonComponent {...props} />;

    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Text = (props) => {
  const { attributes, children, leaf } = props;
  return (
    <span
      // The following is a workaround for a Chromium bug where,
      // if you have an inline at the end of a block,
      // clicking the end of a block puts the cursor inside the inline
      // instead of inside the final {text: ''} node
      // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
      className={
        leaf.text === ""
          ? css`
              padding-left: 0.1px;
            `
          : null
      }
      {...attributes}
    >
      {children}
    </span>
  );
};

const ToggleEditableButtonButton = () => {
  const editor = useSlate();
  return (
    <Button
      // active
      onMouseDown={(event) => {
        event.preventDefault();
        if (isButtonActive(editor)) {
          unwrapButton(editor);
        } else {
          insertButton(editor);
        }
      }}
    >
      <Plus />
    </Button>
  );
};

export default InlinesExample;
