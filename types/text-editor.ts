import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor;

export type TextAlignType = "center" | "left" | "right" | "justify";

export type ParagraphElement = {
  type: "paragraph";
  align?: TextAlignType;
  children: CustomText[];
};
export type TableElement = {
  type: "table";
  children: TableRow[];
};
export type TableRow = {
  type: "table-row";
  children: TableCell[];
};

export type TableCell = {
  type: "table-cell";
  children: CustomText[];
};

export type CustomElement = ParagraphElement | TableElement;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  questionNumber?: number;
};

export type CustomText = FormattedText;
