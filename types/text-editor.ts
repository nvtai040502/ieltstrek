import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor;

export type TextAlignType = "center" | "left" | "right" | "justify";

export type ParagraphElement = {
  type: "paragraph";
  align?: TextAlignType;
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type BlockQuoteElement = {
  type: "blockquote";
  children: CustomText[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  questionNumber?: number;
};

export type CustomText = FormattedText;
