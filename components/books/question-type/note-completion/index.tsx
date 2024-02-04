"use client";

import { NoteCompletionExtended } from "@/types/db";
import { GroupItemRender } from "./group-item";
import { UpdateButton } from "../../update-button";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { UpdateNoteCompletionForm } from "./update";
import { useState } from "react";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  const [isEditing, setEditing] = useState(false);
  if (!noteCompletion) {
    return null;
  }

  return (
    <>
    <div className="flex items-center gap-2 justify-center">
      <p className="text-center font-bold"> {noteCompletion.title} </p>
      <UpdateButton setIsUpdating={() => setEditing(true)}/>
    </div>
      <Dialog open={isEditing} onOpenChange={() => setEditing(!isEditing)}>
        <DialogContentWithScrollArea>
          <UpdateNoteCompletionForm
            noteCompletion={noteCompletion}
            setIsEditing={setEditing}
          />
        </DialogContentWithScrollArea>
      </Dialog>
      {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => {
        return <GroupItemRender noteCompletion={noteCompletion} groupItem={groupItem} key={groupItem.id} />;
      })}
    </>
  );
};
