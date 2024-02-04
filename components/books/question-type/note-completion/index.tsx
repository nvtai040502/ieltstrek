"use client";

import { NoteCompletionExtended } from "@/types/db";
import { GroupItemRender } from "./group-item";

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
      {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => {
        return <GroupItemRender groupItem={groupItem} key={groupItem.id} />;
      })}
    </>
  );
};
