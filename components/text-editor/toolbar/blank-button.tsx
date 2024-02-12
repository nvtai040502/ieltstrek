import { Button } from "@/components/ui/button";
import { Editor, Element, Transforms, Range as RangeSlate } from "slate";
import { useSlate } from "slate-react";

const unwrapBlank = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "blank",
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

export const BlankButton = ({ icon }: { icon: React.ReactNode }) => {
  const editor = useSlate();
  const isActive = isBlankActive(editor);
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onMouseDown={(event) => {
        event.preventDefault();
        if (isBlankActive(editor)) {
          unwrapBlank(editor);
        } else {
          insertBlank(editor);
        }
      }}
    >
      {icon}
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
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "blank",
  });
  return !!blank;
};
