"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { EditPassageForm } from "./edit-passage-form"
import { startTransition, useState, useTransition } from "react"
import { PartWithPassage } from "@/types/db"

const ResizePannelGroup = ({
  part
}: {
  part: PartWithPassage,
}) => {
  const [isEditting, setIsEditting] = useState(true)
  
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg flex-grow">
        <ResizablePanel defaultSize={50} className="overflow-auto h-full">
          <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
            {isEditting ? 
            (
              <div>
                <EditPassageForm part={part} setIsEditting={setIsEditting}/>
              </div>
            ): (
              <div className="">
              <Button onClick={() => setIsEditting(true)}>
                Edit
              </Button>
                <p className="font bold"> {part.passage?.title} </p>
                <p className=""> {part.passage?.content} </p>
              </div>

            )}
            
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
        <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
            
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ResizePannelGroup