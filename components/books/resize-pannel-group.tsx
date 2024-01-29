"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { UpdatePassageForm } from "./passage/update-form"
import { startTransition, useState, useTransition } from "react"
import { PartExtended } from "@/types/db"
import { CreateQuestionForm } from "./question/create-form"
import { UpdateQuestionForm } from "./question/update-form"
import { CreateScorableItemForm } from "./scorable-item/create-form"
import { UpdateScorableItemForm } from "./scorable-item/update-form"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

const ResizePannelGroup = ({
  part
}: {
  part: PartExtended,
}) => {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
  const [isEdittingScorableItem, setIsEdittingScorableItem] = useState(false)
  // Use an object to keep track of which questions are in update mode
  const [edittingQuestions, setEdittingQuestions] = useState<{ [key: string]: boolean }>({});
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg flex-grow">
        <ResizablePanel defaultSize={50} className="overflow-auto h-full">
          <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
            {isEdittingPassage ? 
            (
              <UpdatePassageForm part={part} setIsEditting={setIsEdittingPassage}/>
            ): (
              <div className="">
                <p className="font bold"> {part.passage?.title} </p>
                <p className=""> {part.passage?.content} </p>
                <Button onClick={() => setIsEdittingPassage(true)}>
                  Edit
                </Button>
              </div>

            )}
            
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
        <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
          <Button onClick={() => setIsCreatingQuestion(true)}>Create</Button>
          <Dialog onOpenChange={setIsCreatingQuestion} open={isCreatingQuestion}>
            <DialogContent>
              <CreateQuestionForm part={part} setIsCreatingQuestion={setIsCreatingQuestion}/>
            </DialogContent>
          </Dialog>
          {part.questions && (
            part.questions.map((question) => {
              // Check if the current question is in update mode
              const isEdittingQuestion = edittingQuestions[question.id];
              return (
                (
                  isEdittingQuestion ? (
                    <UpdateQuestionForm  key={question.id} question={question} setIsEditting={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: false })}/>
                  ): (
                    <>
                    <div key={question.id}>
                      <div>
                        <p>{question.content}</p>
                        {/* <p>{question.decription}</p> */}
                      </div>
                      <Button onClick={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: true })}>Update</Button>
                    </div>
                    {/* <CreateScorableItemForm question={question}/>
                    {question.scorableItems && (
                      question.scorableItems.map((scorableItem) => (
                        isEdittingScorableItem ? (
                          <div key={scorableItem.id}>
                            <UpdateScorableItemForm scorableItem={scorableItem} setIsEditting={setIsEdittingScorableItem}/>
                          </div>
                        ): (
                          <div key={scorableItem.id} className=" flex justify-between items-center">
                            <div>
                              <p>{scorableItem.content}</p>
                            </div>
                            <Button onClick={() => setIsEdittingScorableItem(true)}>Update</Button>
                          </div>
                        )
                      ))
                    )} */}
                    </>
                  )
                  
                )
              )
            })
          )}
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ResizePannelGroup