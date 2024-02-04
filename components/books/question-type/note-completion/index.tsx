"use client";

import { NoteCompletionExtended } from "@/types/db";
import { GroupItemRender } from "./group-item";
import { UpdateButton } from "../../update-button";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { UpdateNoteCompletionForm } from "./update";
import { useContext, useState } from "react";
import { EditContext } from "@/global/edit-context";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  const {setIsOpen, setType, setData} = useContext(EditContext)
  if (!noteCompletion) {
    return null;
  }
  
  return (
    <>
    <div className="flex items-center gap-2 justify-center">
      <p className="text-center font-bold"> {noteCompletion.title} </p>
      <UpdateButton setIsUpdating={() => {
        setIsOpen(true)
        setType("editNoteCompletion")
        setData({noteCompletion})
        }}/>
    </div>
      
      {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => {
        return <GroupItemRender noteCompletion={noteCompletion} groupItem={groupItem} key={groupItem.id} />;
      })}
    </>
  );
};
