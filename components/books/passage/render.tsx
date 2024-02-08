"use client";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { PartExtended } from "@/types/db";
import { useState } from "react";
import { ActionButton } from "../action-button";
import { UpdatePassageForm } from "./update-form";

export function PassageRender({ part }: { part: PartExtended }) {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false);
  return (
    <div>
      {part.passage ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <p className=" font-bold"> {part.passage.title} </p>
              <p className=" italic font-light">{part.passage.description}</p>
            </div>
            {/* <ActionButton /> */}
          </div>
          <p className="whitespace-pre-line"> {part.passage.content} </p>

          <Dialog onOpenChange={setIsEdittingPassage} open={isEdittingPassage}>
            <DialogContentWithScrollArea>
              <UpdatePassageForm
                passage={part.passage}
                setIsEditting={setIsEdittingPassage}
              />
            </DialogContentWithScrollArea>
          </Dialog>
        </div>
      ) : (
        <>
          <ActionButton
            actionType="create"
            editType="createPassage"
            data={{ part }}
          />
        </>
      )}
    </div>
  );
}
