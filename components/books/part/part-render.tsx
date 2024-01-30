"use client"
import { Part } from "@prisma/client";
import { Button } from "../../ui/button";
import { PartExtended } from "@/types/db";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { UpdatePartForm } from "./update-form";

export function PartRender({part}: {part: PartExtended}) {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  return (
    <div className="p-4">
      <div className="px-4 py-2 border-foreground rounded-md border items-center">
        <p className=" font-bold">{part.title} </p>
        <p> {part.description} </p>
        <Button onClick={() => setIsEdittingPassage(true)}>Update</Button>
        <Dialog onOpenChange={setIsEdittingPassage} open={isEdittingPassage}>
          <DialogContent>
            <UpdatePartForm part={part} setIsEditting={setIsEdittingPassage}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}