"use client";

import { NoteCompletionExtended } from "@/types/db";
import { useEditHook } from "@/global/use-edit-hook";
import RichTextEditor from "./rich-text-editor";
import { UpdateButton } from "../../update-button";
import RichTextReadOnly from "./rich-text-readonly";

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
      <UpdateButton type="editNoteCompletion" data={{noteCompletion}} />
      <RichTextEditor/>
      {/* <RichTextReadOnly noteCompletion={noteCompletion}/> */}
    </>
  );
};
