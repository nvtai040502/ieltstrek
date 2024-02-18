import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TextAlignType = 'center' | 'left' | 'right' | 'justify';

export type ParagraphElement = {
  type: 'paragraph';
  align?: TextAlignType;
  children: CustomText[];
};
export type BlankElement = {
  type: 'blank';
  questionNumber: number;
  children: CustomText[];
};
export type TableElement = {
  type: 'table';
  children: CustomText[];
};
export type TableRowElement = {
  type: 'table-row';
  children: CustomText[];
};

export type TableCellElement = {
  type: 'table-cell';
  children: CustomText[];
};
export type BlockQuoteElement = {
  type: 'blockquote';
  children: CustomText[];
};
export type BulletedListElement = {
  type: 'bulleted-list';
  children: CustomText[];
};
export type HeadingOneElement = {
  type: 'heading-one';
  children: CustomText[];
};
export type HeadingTwoElement = {
  type: 'heading-two';
  children: CustomText[];
};
export type ListItemElement = {
  type: 'list-item';
  children: CustomText[];
};
export type NumberedListElement = {
  type: 'numbered-list';
  children: CustomText[];
};

export type CustomElement =
  | ParagraphElement
  | TableElement
  | BlankElement
  | TableCellElement
  | TableRowElement
  | HeadingOneElement
  | HeadingTwoElement
  | ListItemElement
  | NumberedListElement
  | BlockQuoteElement
  | BulletedListElement;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type CustomText = FormattedText;
