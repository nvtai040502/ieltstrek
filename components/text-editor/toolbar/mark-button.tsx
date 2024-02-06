import { Button } from "@/components/ui/button";
import { EditType } from "@/global/edit-context";
import { EditorType } from "@/types/text-editor";
import { Editor } from "slate";
import { useSlate } from "slate-react";

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: React.ReactNode;
}) => {
  const editor = useSlate();
  const marks = Editor.marks(editor) as Record<string, boolean>;
  const isActive = marks ? marks[format] === true : false;
  const toggleMark = () => {
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };
  return (
    <Button
      className=""
      variant={isActive ? "default" : "outline"}
      size="sm"
      onMouseDown={(e) => {
        e.preventDefault()
        toggleMark()
      }}
    >
      {icon}
    </Button>
  );
};
