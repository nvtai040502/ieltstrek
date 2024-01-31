"use client"
import { Part } from "@prisma/client";
import { Button } from "../../ui/button";
import { PartExtended } from "@/types/db";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { UpdatePartForm } from "./update-form";
import { UpdateButton } from "../update-button";

export function PartRender({part}: {part: PartExtended}) {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  return (
    <div className="p-4">
      <div className="px-4 py-2 border-foreground rounded-md border items-center">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <p className=" font-bold">{part.title} </p>
            <p> {part.description} </p>
          </div>
          <UpdateButton setIsUpdating={() => setIsEdittingPassage(true)}/>

        </div>
        <Dialog onOpenChange={setIsEdittingPassage} open={isEdittingPassage}>
          <DialogContent>
            <UpdatePartForm part={part} setIsEditting={setIsEdittingPassage}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}