"use client";

import { NoteCompletionExtended } from "@/types/db";
import { UpdateButton } from "../../update-button";
import { useEditHook } from "@/global/use-edit-hook";
import RichTextExample from "@/components/text-editor/rich-text";
import RichText from "@/components/text-editor/rich-text";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  const { onOpen } = useEditHook();
  if (!noteCompletion) {
    return null;
  }
  return (
    <>
      <UpdateButton
        setIsUpdating={() =>
          onOpen({ type: "editNoteCompletion", data: {noteCompletion} })
        }
      />
      <RichText noteCompletion={noteCompletion} />
    </>
  );
};
