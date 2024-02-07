import BlankRender from "@/components/books/blank-render";

export const LeafEditorRender = ({
  attributes,
  children,
  leaf,
}: {
  leaf: any;
  children: any;
  attributes: any;
}) => {
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

export const LeafReadOnlyRender = ({
  attributes,
  children,
  leaf,
}: {
  leaf: any;
  children: any;
  attributes: any;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <BlankRender questionNumber={leaf.questionNumber} />;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
