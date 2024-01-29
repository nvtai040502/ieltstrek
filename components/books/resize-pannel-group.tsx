"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { UpdatePassageForm } from "./passage/update-form"
import { startTransition, useState, useTransition } from "react"
import { PartExtended } from "@/types/db"
import { CreateQuestionForm } from "./question-with-scorable-items/create-form"
import { UpdateQuestionForm } from "./question-with-scorable-items/update-form"
import { UpdateScorableItemForm } from "./scorable-item/update-form"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { MultipleChoiceRender } from "./question-type-render/multiple-choice"

const ResizePannelGroup = ({
  part
}: {
  part: PartExtended,
}) => {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
  const [edittingQuestions, setEdittingQuestions] = useState<{ [key: string]: boolean }>({});
  const [edittingScorableItems, setEdittingScorableItems] = useState<{ [key: string]: boolean }>({});
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
              const isEdittingQuestion = edittingQuestions[question.id];
              return (
                <div key={question.id}>
                <Dialog 
                  open={isEdittingQuestion}
                  onOpenChange={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: false })} 
                  key={question.id}
                >
                  <DialogContent>
                    <UpdateQuestionForm question={question} setIsEditting={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: false })}/>
                  </DialogContent>
                </Dialog>
                <div>
                  <p>{question.content}</p>
                </div>
                <Button onClick={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: true })}>Update</Button>
                    {question.scorableItems && (
                      question.scorableItems.map((scorableItem) => {
                        const isEdittingScorableItem = edittingScorableItems[scorableItem.id];
                        return (
                          <div  key={scorableItem.id}>
                            <Dialog 
                              open={isEdittingScorableItem}
                              onOpenChange={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: false })} 
                             
                            >
                              <DialogContent>
                                <UpdateScorableItemForm 
                                  scorableItem={scorableItem} 
                                  setIsEditting={
                                    () => setEdittingScorableItems({ 
                                      ...edittingScorableItems, 
                                      [scorableItem.id]: false 
                                      })}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <div className="space-y-2">
                              <div>
                                <p>{scorableItem.content}</p>
                                <Button onClick={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: true })}>Update</Button>
                                
                                {question.type === "MULTIPLE_CHOICE" && scorableItem.multipleChoice && (
                                  <MultipleChoiceRender multipleChoice={scorableItem.multipleChoice}/>
                                )}
                              
                              </div>
                              
                            </div>
                            </div>
                        )
                      })
                    )}
                    </div>  
                
                  
                
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