"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { UpdatePassageForm } from "./passage/update-form"
import { startTransition, useState, useTransition } from "react"
import { PartExtended } from "@/types/db"
import { UpdateQuestionForm } from "./question-group/update-form"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { MultipleChoiceRender } from "./question-type/multiple-choice"
import { ShortAnswerRender } from "./question-type/short-anser"
import { UpdatePartForm } from "./part/update-form"
import { PassageRender } from "./passage/render"
import { CreateQuestionGroupForm } from "./question-group/create-form"

const ResizePannelGroup = ({
  part
}: {
  part: PartExtended,
}) => {
  const [isEdittingPassage, setIsEdittingPassage] = useState(false)
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
  const [edittingQuestions, setEdittingQuestions] = useState<{ [key: string]: boolean }>({});
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg flex-grow">
        <ResizablePanel defaultSize={50} className="overflow-auto h-full">
          <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
            <PassageRender part={part}/>
          <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
        <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
          <Button onClick={() => setIsCreatingQuestion(true)}>Create</Button>
          <Dialog onOpenChange={setIsCreatingQuestion} open={isCreatingQuestion}>
            <DialogContent>
              <CreateQuestionGroupForm partId={part.id} setIsCreating={setIsCreatingQuestion}/>
            </DialogContent>
          </Dialog>
          {part.questionGroups && (
            part.questionGroups.map((questionGroup) => {
              const isEdittingQuestion = edittingQuestions[questionGroup.id];
              return (
                <div key={questionGroup.id}>
                <Dialog 
                  open={isEdittingQuestion}
                  onOpenChange={() => setEdittingQuestions({ ...edittingQuestions, [questionGroup.id]: false })} 
                  key={questionGroup.id}
                >
                  <DialogContent>
                    <UpdateQuestionForm question={questionGroup} setIsEditting={() => setEdittingQuestions({ ...edittingQuestions, [questionGroup.id]: false })}/>
                  </DialogContent>
                </Dialog>
                <div>
                  <p className="font-bold">Questions {questionGroup.startQuestionNumber}-{questionGroup.endQuestionNumber}</p>
                  <p className=" whitespace-pre-line">{questionGroup.title}</p>
                </div>
                <Button onClick={() => setEdittingQuestions({ ...edittingQuestions, [questionGroup.id]: true })}>Update</Button>
                    {questionGroup.scorableItems && (
                      questionGroup.type === "MULTIPLE_CHOICE" && (
                        <MultipleChoiceRender
                          scorableItems={questionGroup.scorableItems}
                        />
                      ),
                      (
                        questionGroup.type === "SHORT_ANSWER" && (
                          <ShortAnswerRender
                            scorableItems={questionGroup.scorableItems}
                          />
                        )
                      )
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