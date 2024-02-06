import { useEditHook } from "@/global/use-edit-hook";
import { RenderElementProps } from "slate-react";
import BlankRender from "../books/blank-render";
import { Input } from "../ui/input";
import { useEffect } from "react";

export const ElementRender = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };

  switch (element.type) {
    case "blockquote":
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

export const LeafRender = ({
  attributes,
  children,
  leaf,
}: {
  leaf: any,
  children: any,
  attributes: any
}) => {
  const { onClose, data, isOpen, type } = useEditHook();
  const isEdit = isOpen && type === "editNoteCompletion";
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = isEdit ? (
      <code className="bg-red-500">{children}</code>
    ) : (
      <Input/>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
