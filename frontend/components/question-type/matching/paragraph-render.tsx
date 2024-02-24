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
import { ElementRender } from '@/components/common/text-editor/element-render';
import { LeafRender } from '@/components/common/text-editor/leaf-render/leaf-render';

const MatchingParagraphRender = ({
  matching
}: {
  matching: MatchingExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <ElementRender slateProps={props} type="Matching" mode="readonly" />
    ),
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRender {...props} />,
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