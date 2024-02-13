'use client';

import React, { useCallback, useMemo, useTransition } from 'react';
import { EditElementRender } from '@/components/text-editor/text-render/element-render';
import { LeafReadOnlyRender } from '@/components/text-editor/text-render/leaf-render';
import { CompletionExtended } from '@/types/test-exam';
import { CustomEditor, CustomElement, CustomText } from '@/types/text-editor';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact
} from 'slate-react';

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
    (props: RenderElementProps) => <EditElementRender props={props} />,
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
