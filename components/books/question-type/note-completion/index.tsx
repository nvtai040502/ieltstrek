"use client";

import { NoteCompletionExtended } from "@/types/db";
import { GroupItemRender } from "./group-item";
import { UpdateButton } from "../../update-button";

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
      <p className="text-center font-bold"> {noteCompletion.title} </p>
      {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => {
        return <GroupItemRender groupItem={groupItem} key={groupItem.id} />;
      })}
    </>
  );
};
