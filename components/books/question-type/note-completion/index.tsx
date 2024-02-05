"use client";

import { NoteCompletionExtended } from "@/types/db";
import { UpdateButton } from "../../update-button";
import { useEditHook } from "@/global/use-edit-hook";
import { Preview } from "@/components/text-editor/preview";
import ReactQuill from "react-quill";

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
console.log(noteCompletion)
  return (
    <>
      <div className="flex items-center gap-2 justify-center">
        <p className="text-center font-bold"> {noteCompletion.title} </p>
        <UpdateButton
          setIsUpdating={() => {
            onOpen({ type: "editNoteCompletion", data: { noteCompletion } });
          }}
        />
      </div>
      <ReactQuill theme="bubble" value={noteCompletion.paragraph} onChange={(e) => console.log(e)} readOnly />
    </>
  );
};
