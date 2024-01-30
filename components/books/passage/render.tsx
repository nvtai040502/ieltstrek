"use client"
import { Part, Passage } from "@prisma/client";
import { Button } from "../../ui/button";
import { PartExtended } from "@/types/db";
import { Dialog, DialogContent, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { useState } from "react";
import { UpdatePassageForm } from "./update-form";
import { CreatePassageForm } from "./create-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PassageRender({part}: {part: PartExtended}) {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  return (
    <div>
      {part.passage ? (
        <>
          <p className=" font-bold"> {part.passage.title} </p>
          <p className="whitespace-pre-line"> {part.passage.content} </p>
          <Button onClick={() => setIsEdittingPassage(true)}>Update</Button>
          <Dialog onOpenChange={setIsEdittingPassage} open={isEdittingPassage}>
            <DialogContentWithScrollArea>
              <UpdatePassageForm passage={part.passage} setIsEditting={setIsEdittingPassage}/>
            </DialogContentWithScrollArea>
          </Dialog>
        </>
      ): (
        <>
          <Button onClick={() => setIsEdittingPassage(true)}>Create</Button>
          <Dialog onOpenChange={setIsEdittingPassage} open={isEdittingPassage}>
            <DialogContentWithScrollArea>
                <CreatePassageForm partId={part.id} setIsEditting={setIsEdittingPassage}/>
            </DialogContentWithScrollArea>
          </Dialog>
        </>
        
      )}
      
    </div>
  )
}