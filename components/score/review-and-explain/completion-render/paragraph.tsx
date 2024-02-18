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
import { ElementRender } from '@/components/common/text-editor/element-render';
import { LeafReadOnlyRender } from '@/components/common/text-editor/text-render/leaf-render';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ParagraphRender = ({
  completion
}: {
  completion: CompletionExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <ElementRender
        slateProps={props}
        type="Completion"
        mode="result"
        assessmentId={completion.questions[0].assessmentId}
      />
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

export default ParagraphRender;
