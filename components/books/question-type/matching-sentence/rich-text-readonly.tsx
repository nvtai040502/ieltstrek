"use client";
import React, { useCallback, useMemo, useTransition } from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

import { CustomEditor, CustomElement, CustomText } from "@/types/text-editor";
import { NoteCompletionExtended } from "@/types/db";
import { ElementRender } from "@/components/text-editor/text-render/element-render";
import {
  LeafReadOnlyMatchingRender,
  LeafReadOnlyRender,
} from "@/components/text-editor/text-render/leaf-render";
import { MatchingSentenceExtended } from "@/types/question-type";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const RichTextReadOnly = ({
  matchingSentence,
}: {
  matchingSentence: MatchingSentenceExtended;
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRender {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafReadOnlyMatchingRender {...props} />,
    [],
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate
      editor={editor}
      initialValue={JSON.parse(matchingSentence.paragraph)}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};

export default RichTextReadOnly;
