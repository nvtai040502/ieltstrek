"use client";

import { NoteCompletionExtended } from "@/types/db";
import RichTextReadOnly from "./rich-text-readonly";
import { ActionButton } from "../../action-button";
import { MatchingSentenceExtended } from "@/types/question-type";

interface MatchingSentenceRenderProps {
  matchingSentence?: MatchingSentenceExtended | null;
}
export const MatchingSentenceRender = ({
  matchingSentence,
}: MatchingSentenceRenderProps) => {
  if (!matchingSentence) {
    return null;
  }

  return (
    <>
      <ActionButton
        actionType="update"
        editType="editNoteCompletion"
        data={{ matchingSentence }}
      />

      <RichTextReadOnly matchingSentence={matchingSentence} />
    </>
  );
};
