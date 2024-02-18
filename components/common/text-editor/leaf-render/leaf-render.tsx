import React from 'react';
import { FormattedText } from '@/types/text-editor';

export const LeafRender = ({
  attributes,
  leaf,
  children
}: {
  attributes: { 'data-slate-leaf': true };
  leaf: FormattedText;
  children: React.ReactNode;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
