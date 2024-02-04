"use client";

import { NoteCompletionExtended } from "@/types/db";
import { GroupItemRender } from "./group-item";
import { UpdateButton } from "../../update-button";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { UpdateNoteCompletionForm } from "./update";
import { useContext, useState } from "react";
import { EditContext } from "@/global/edit-context";
import { useEditHook } from "@/global/use-edit-hook";

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
      <div className="flex items-center gap-2 justify-center">
        <p className="text-center font-bold"> {noteCompletion.title} </p>
        <UpdateButton
          setIsUpdating={() => {
            onOpen({ type: "editNoteCompletion", data: { noteCompletion } });
          }}
        />
      </div>

      {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => {
        return (
          <GroupItemRender
            noteCompletion={noteCompletion}
            groupItem={groupItem}
            key={groupItem.id}
          />
        );
      })}
    </>
  );
};
