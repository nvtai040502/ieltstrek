import React, { useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import {
  Editor,
  Range,
  Point,
  Descendant,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import Toolbar from "./toolbar";
import { LeafEditorRender } from "./text-render/leaf-render";
import { ElementRender } from "./text-render/element-render";

const TablesExample = () => {
  const renderElement = useCallback(
    (props) => <ElementRender {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props) => <LeafEditorRender {...props} />,
    [],
  );
  const editor = useMemo(
    () => withTables(withHistory(withReact(createEditor()))),
    [],
  );
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

const withTables = (editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "table",
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

const numberColumns = 4;
const numberRows = 4;
const maxCode = 5;
let codeCount = 0; // Initialize codeCount outside the array declaration
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:",
      },
    ],
  },
  {
    type: "table",
    children: Array.from(
      {
        length: numberRows,
      },
      (_, i) => ({
        type: "table-row",
        children: Array.from(
          {
            length: numberColumns,
          },
          (_, j) => {
            const isCode = j % 2 !== 0 && codeCount < maxCode;
            if (isCode) {
              codeCount++;
            }
            return {
              type: "table-cell",
              children: [{ text: "Human", bold: true, code: isCode }],
            };
          },
        ),
      }),
    ),
  },
];
export default TablesExample;
