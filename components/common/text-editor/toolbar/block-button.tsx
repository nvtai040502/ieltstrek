import { Button } from "@/components/ui/button";
import { TextAlignType } from "@/types/text-editor";
import { Element } from "slate";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

function BlockButton({
  format,
  icon,
}: {
  format: string;
  icon: React.ReactNode;
}) {
  // console.log(format)
  const editor = useSlate();
  const LIST_TYPES = ["numbered-list", "bulleted-list"];
  const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

  const toggleBlock = () => {
    const isActive = isBlockActive(
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<Element>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : (format as TextAlignType),
      };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      } as any;
    }
    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block as any);
    }
  };
  const isBlockActive = (blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n[blockType] === (format as any),
      }),
    );

    return !!match;
  };
  const isActive = isBlockActive(
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock();
      }}
    >
      {icon}
    </Button>
  );
}

export default BlockButton;
