import { Editor, Element, Range as RangeSlate, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { CustomEditor } from '@/types/text-editor';
import { Button } from '@/components/ui/button';

const unwrapBlank = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'blank'
  });
};

const wrapButton = (editor: CustomEditor) => {
  if (isBlankActive(editor)) {
    unwrapBlank(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && RangeSlate.isCollapsed(selection);
  // TODO: Fix type script this
  const blank: any = {
    type: 'blank',
    children: isCollapsed ? [{ text: 'Edit me!' }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, blank);
  } else {
    Transforms.wrapNodes(editor, blank, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const BlankButton = ({ icon }: { icon: React.ReactNode }) => {
  const editor = useSlate();
  const isActive = isBlankActive(editor);
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
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

const insertBlank = (editor: CustomEditor) => {
  if (editor.selection) {
    wrapButton(editor);
  }
};

const isBlankActive = (editor: CustomEditor) => {
  const [blank] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'blank'
  });
  return !!blank;
};
