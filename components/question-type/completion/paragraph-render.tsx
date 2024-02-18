'use client';

import { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';
import { CompletionExtended } from '@/types/test-exam';
import { CustomEditor, CustomElement, CustomText } from '@/types/text-editor';
import { LeafReadOnlyRender } from '@/components/common/text-editor/text-render/leaf-render';
import CompletionBlankRender from './blank-render';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CompletionParagraphRender = ({
  completion
}: {
  completion: CompletionExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <ReadonlyElementRender props={props} type="Completion" />
    ),
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafReadOnlyRender {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} initialValue={JSON.parse(completion.paragraph)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};

export default CompletionParagraphRender;

export const ReadonlyElementRender = ({
  props,
  type
}: {
  props: RenderElementProps;
  type: 'Matching' | 'Completion';
}) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'blank':
      if (type === 'Completion') {
        return (
          <CompletionBlankRender questionNumber={element.questionNumber} />
        );
      }
    case 'table':
      return (
        <table className="w-full">
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case 'table-row':
      return (
        <tr className="m-0 border-t p-0" {...attributes}>
          {children}
        </tr>
      );
    case 'table-cell':
      return (
        <td
          className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          {...attributes}
        >
          {children}
        </td>
      );
    case 'blockquote':
      return (
        <blockquote className="mt-6 border-l-2 pl-6 italic" {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2
          className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          {...attributes}
        >
          {children}
        </h2>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <span {...attributes}>{children}</span>;
  }
};
