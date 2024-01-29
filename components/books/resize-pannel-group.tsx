"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { EditPassageForm } from "./edit-passage-form"
import { startTransition, useState, useTransition } from "react"
import { PartExtended } from "@/types/db"
import { CreateQuestionForm } from "./create-question-form"
import { EditQuestionForm } from "./edit-question-form"

const ResizePannelGroup = ({
  part
}: {
  part: PartExtended,
}) => {
  const [isEditting, setIsEditting] = useState(false)
  const [isEdittingQuestion, setIsEdittingQuestion] = useState(false)
  console.log(part.questions)
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
          <CreateQuestionForm part={part}/>
          {part.questions && (
            part.questions.map((question) => (
              isEdittingQuestion ? (
                <div key={question.id} className="flex justify-between items-center">
                  <EditQuestionForm question={question} setIsEditting={setIsEdittingQuestion}/>
                </div>
              ): (
                <div key={question.id} className="flex justify-between items-center">
                  <div>
                    <p>{question.title}</p>
                    <p>{question.decription}</p>
                  </div>
                  <Button onClick={() => setIsEdittingQuestion(true)}>Update</Button>
                </div>
              )
              
            ))
          )}
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ResizePannelGroup