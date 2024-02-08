"use client";

import { NoteCompletionExtended } from "@/types/db";
import RichTextReadOnly from "./rich-text-readonly";
import { ActionButton } from "../../action-button";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  if (!noteCompletion) {
    return null;
  }

  return (
    <>
      <ActionButton
        actionType="update"
        editType="editNoteCompletion"
        data={{ noteCompletion }}
      />

      <RichTextReadOnly noteCompletion={noteCompletion} />
    </>
  );
};
