"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import React, { useContext, useEffect, useState } from "react";
import { PartExtended } from "@/types/db";
import { Dialog, DialogContent } from "../ui/dialog";
import { PassageRender } from "./passage/render";
import { CreateQuestionGroupForm } from "./question-group/create-form";
import { DeleteButton, UpdateButton } from "./update-button";
import { ExamContext } from "@/global/exam-context";
import { MultipleChoiceArrayRender } from "./question-type/multiple-choice";
import { NoteCompletionRender } from "./question-type/note-completion";
import { IdentifyingInformationRender } from "./question-type/identifying-information";
import { MultiMoreAnswersRender } from "./question-type/multi-more-answers";

const ResizePanelGroup = ({ part }: { part: PartExtended }) => {
  const { questionRefs, setCurrentQuestionIndex } = useContext(ExamContext);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  useEffect(() => {
    if (questionRefs.length && part.questionGroups.length) {
      questionRefs[
        part.questionGroups[0].startQuestionNumber - 1
      ].current?.focus();
      setCurrentQuestionIndex(part.questionGroups[0].startQuestionNumber - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg flex-grow"
      >
        <ResizablePanel defaultSize={50} className="overflow-auto h-full">
          <ScrollArea
            type="always"
            className="w-full h-full overflow-auto pl-4 pr-8"
          >
            <PassageRender part={part} />
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ScrollArea
            type="always"
            className="w-full h-full overflow-auto pl-4 pr-8"
          >
            <div className="flex justify-end">
              <Button onClick={() => setIsCreatingQuestion(true)}>
                Create
              </Button>
            </div>
            <Dialog
              onOpenChange={setIsCreatingQuestion}
              open={isCreatingQuestion}
            >
              <DialogContent>
                <CreateQuestionGroupForm
                  part={part}
                  setIsCreating={setIsCreatingQuestion}
                />
              </DialogContent>
            </Dialog>
            {part.questionGroups &&
              part.questionGroups.map((questionGroup) => {
                return (
                  <div key={questionGroup.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">
                          Questions {questionGroup.startQuestionNumber}-
                          {questionGroup.endQuestionNumber}
                        </p>
                        <p className=" whitespace-pre-line">
                          {questionGroup.title}
                        </p>
                      </div>
                      <div>
                        <UpdateButton
                          type="editQuestionGroup"
                          data={{ questionGroup }}
                        />
                        <DeleteButton
                          type="deleteQuestionGroup"
                          data={{ questionGroup }}
                        />
                      </div>
                    </div>

                    {questionGroup.type === "MULTIPLE_CHOICE" && (
                      <MultipleChoiceArrayRender
                        multipleChoiceArray={questionGroup.multipleChoiceArray}
                      />
                    )}
                    {questionGroup.type === "MULTIPLE_CHOICE_MORE_ANSWERS" && (
                      <MultiMoreAnswersRender
                        multipleChoiceArray={questionGroup.multipleChoiceArray}
                      />
                    )}
                    {/* {questionGroup.type === "SUMMARY_COMPLETION" && (
                      <SummaryCompletionRender
                        summaryCompletion={questionGroup.summaryCompletion}
                      />
                    )} */}
                    {questionGroup.type === "IDENTIFYING_INFORMATION" && (
                      <IdentifyingInformationRender
                        identifyingInformation={
                          questionGroup.identifyingInformation
                        }
                      />
                    )}
                    {questionGroup.type === "NOTE_COMPLETION" && (
                      <NoteCompletionRender
                        noteCompletion={questionGroup.noteCompletion}
                      />
                    )}
                  </div>
                );
              })}
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizePanelGroup;
