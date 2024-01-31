"use client"
import { Part } from "@prisma/client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { UpdatePassageForm } from "./passage/update-form"
import { startTransition, useState, useTransition } from "react"
import { PartExtended } from "@/types/db"
import { UpdateQuestionGroupForm } from "./question-group/update-form"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { MultipleChoiceRender } from "./question-type/multiple-choice"
import { ShortAnswerRender } from "./question-type/short-anser"
import { PassageRender } from "./passage/render"
import { CreateQuestionGroupForm } from "./question-group/create-form"
import { UpdateButton } from "./update-button"

const ResizePannelGroup = ({
  part
}: {
  part: PartExtended,
}) => {
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
  const [edittingQuestionGroup, setEdittingQuestionGroup] = useState<{ [key: string]: boolean }>({});
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
              const isEdittingQuestionGroup = edittingQuestionGroup[questionGroup.id];
              return (
                <div key={questionGroup.id} className="flex flex-col gap-2">
                  <Dialog 
                    open={isEdittingQuestionGroup}
                    onOpenChange={() => setEdittingQuestionGroup({[questionGroup.id]: false })} 
                    key={questionGroup.id}
                  >
                    <DialogContent>
                      <UpdateQuestionGroupForm questionGroup={questionGroup} setIsEditting={() => setEdittingQuestionGroup({[questionGroup.id]: false })}/>
                    </DialogContent>
                  </Dialog>
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold">Questions {questionGroup.startQuestionNumber}-{questionGroup.endQuestionNumber}</p>
                      <p className=" whitespace-pre-line">{questionGroup.title}</p>
                      <p className="font-bold text-center">{questionGroup.titleForQuestions}</p>
                    </div>
                    <UpdateButton setIsUpdating={() => setEdittingQuestionGroup({ [questionGroup.id]: true })} />
                  </div>
                  <div className="flex flex-col gap-4">
                    {questionGroup.questions.map((question) => {
                      return (
                        <div key={question.id} >
                          {questionGroup.type === "MULTIPLE_CHOICE" && <MultipleChoiceRender question={question}/>}
                        </div>
                      )
                    })}
                  </div>
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