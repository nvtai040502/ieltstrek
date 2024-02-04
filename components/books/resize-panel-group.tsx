"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { PartExtended } from "@/types/db";
import { UpdateQuestionGroupForm } from "./question-group/update-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { PassageRender } from "./passage/render";
import { CreateQuestionGroupForm } from "./question-group/create-form";
import { UpdateButton } from "./update-button";
import { MultipleChoiceArrayRender } from "./question-type/multiple-choice";
import { SummaryCompletionRender } from "./question-type/summary-completion";
import { DeleteButton } from "./delete-button";
import { AlertDialog } from "../ui/alert-dialog";
import { DeleteQuestionGroupForm } from "./question-group/delete-form";
import { ExamContext } from "@/global/exam-context";
import { IdentifyingInformationRender } from "./question-type/identifying-information";
import { NoteCompletionRender } from "./question-type/note-completion";

const ResizePanelGroup = ({ part }: { part: PartExtended }) => {
  const { questionRefs, setCurrentQuestionIndex } = useContext(ExamContext);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [editingQuestionGroup, setEditingQuestionGroup] = useState<{
    [key: string]: boolean;
  }>({});
  const [deletingQuestionGroup, setDeletingQuestionGroup] = useState<{
    [key: string]: boolean;
  }>({});
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
                const isEditingQuestionGroup =
                  editingQuestionGroup[questionGroup.id];
                const isDeletingQuestionGroup =
                  deletingQuestionGroup[questionGroup.id];
                return (
                  <div key={questionGroup.id} className="flex flex-col gap-2">
                    <Dialog
                      open={isEditingQuestionGroup}
                      onOpenChange={() =>
                        setEditingQuestionGroup({ [questionGroup.id]: false })
                      }
                    >
                      <DialogContent>
                        <UpdateQuestionGroupForm
                          questionGroup={questionGroup}
                          part={part}
                          setIsEditing={() =>
                            setEditingQuestionGroup({
                              [questionGroup.id]: false,
                            })
                          }
                        />
                      </DialogContent>
                    </Dialog>
                    <AlertDialog
                      open={isDeletingQuestionGroup}
                      onOpenChange={() =>
                        setDeletingQuestionGroup({ [questionGroup.id]: false })
                      }
                    >
                      <DeleteQuestionGroupForm
                        questionGroup={questionGroup}
                        setIsCUD={() =>
                          setDeletingQuestionGroup({
                            [questionGroup.id]: false,
                          })
                        }
                      />
                    </AlertDialog>
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
                          setIsUpdating={() =>
                            setEditingQuestionGroup({
                              [questionGroup.id]: true,
                            })
                          }
                        />
                        <DeleteButton
                          setIsUpdating={() =>
                            setDeletingQuestionGroup({
                              [questionGroup.id]: true,
                            })
                          }
                        />
                      </div>
                    </div>

                    {questionGroup.type === "MULTIPLE_CHOICE" && (
                      <MultipleChoiceArrayRender
                        multipleChoiceArray={questionGroup.multipleChoiceArray}
                        // handleMouseDown={handleMouseDown}
                        // handleKeyDown={handleKeyDown}
                      />
                    )}
                    {questionGroup.type === "SUMMARY_COMPLETION" && (
                      <SummaryCompletionRender
                        summaryCompletion={questionGroup.summaryCompletion}
                      />
                    )}
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
