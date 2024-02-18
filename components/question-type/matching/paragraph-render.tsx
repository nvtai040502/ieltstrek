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
import { MatchingExtended } from '@/types/test-exam';
import { CustomEditor, CustomElement, CustomText } from '@/types/text-editor';
import { ReadonlyElementRender } from '@/components/common/text-editor/text-render/element-render';
import { LeafReadOnlyMatchingRender } from '@/components/common/text-editor/text-render/leaf-render';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const MatchingParagraphRender = ({
  matching
}: {
  matching: MatchingExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ReadonlyElementRender props={props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafReadOnlyMatchingRender {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} initialValue={JSON.parse(matching.paragraph)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};

export default MatchingParagraphRender;
