"use client";
import { Part } from "@prisma/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import React, { startTransition, useRef, useState, useTransition } from "react";
import { PartExtended } from "@/types/db";
import { UpdateQuestionGroupForm } from "./question-group/update-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { PassageRender } from "./passage/render";
import { CreateQuestionGroupForm } from "./question-group/create-form";
import { UpdateButton } from "./update-button";
import { MultipleChoiceArrayRender } from "./question-type/multiple-choice";
import { SummaryCompletionRender } from "./question-type/summary-completion";
import { DeleteButton } from "./delete-button";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { DeleteQuestionGroupForm } from "./question-group/delete-form";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ResizePannelGroup = ({
  part,
  handleQuestionSelectAnswer,
  setNextTab,
}: {
  part: PartExtended;
  handleQuestionSelectAnswer: (questionId: string, value: string) => void;
  setNextTab: () => void;
}) => {
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [edittingQuestionGroup, setEdittingQuestionGroup] = useState<{
    [key: string]: boolean;
  }>({});
  const [deletingQuestionGroup, setDeletingQuestionGroup] = useState<{
    [key: string]: boolean;
  }>({});
  const divRefs = Array.from({ length: 40 }, () =>
    React.createRef<HTMLDivElement>()
  );
  const [currentDivIndex, setCurrentDivIndex] = useState(
    part.questionGroups[0]
      ? part.questionGroups[0].startQuestionNumber - 1
      : 0
  );
  const hasPrevDiv = (index: number) => {
    return index > 0;
  };
  const isMouseClickRef = useRef(false);
  const hasNextDiv = (index: number) => {
    return index < divRefs.length - 1;
  };
  const hasNextDivInCurrentPart = () => {};
  const handleNextDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      console.log(part.multipleChoiceArray.length, prevIndex + 2);
      if (prevIndex < divRefs.length - 1) {
        if (prevIndex + 2 <= part.questionGroups[part.questionGroups.length-1].endQuestionNumber) {
          divRefs[prevIndex + 1].current?.focus();
          return prevIndex + 1;
        } else {
          setNextTab();
          // setCurrentDivIndex(prevIndex+1)
          divRefs[prevIndex + 1].current?.focus();
          return prevIndex + 1;
        }
      }
      return prevIndex;
    });
  };

  const handlePrevDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      if (prevIndex > 0) {
        divRefs[prevIndex - 1].current?.focus();
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };
  const handleDivFocus = (index: number) => {
    // Reset the flag for the next focus change
    isMouseClickRef.current = false;
    if (index <= divRefs.length - 1) {
      setCurrentDivIndex(index);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    // Check if the Tab key is pressed
    if (event.key === "Tab") {
      handleDivFocus(index);
    }
  };

  const handleMouseDown = () => {
    isMouseClickRef.current = true;
  };
  return (
    <div className="h-full">
      <div className="absolute inset-0 h-20">
        <Button
          onClick={handlePrevDiv}
          disabled={!hasPrevDiv(currentDivIndex)}
          size="xl"
        >
          <ArrowLeft />
        </Button>
        <Button
          onClick={handleNextDiv}
          disabled={!hasNextDiv(currentDivIndex)}
          size="xl"
        >
          <ArrowRight />
        </Button>
      </div>

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
                const isEdittingQuestionGroup =
                  edittingQuestionGroup[questionGroup.id];
                const isDeletingQuestionGroup =
                  deletingQuestionGroup[questionGroup.id];
                return (
                  <div key={questionGroup.id} className="flex flex-col gap-2">
                    <Dialog
                      open={isEdittingQuestionGroup}
                      onOpenChange={() =>
                        setEdittingQuestionGroup({ [questionGroup.id]: false })
                      }
                    >
                      <DialogContent>
                        <UpdateQuestionGroupForm
                          questionGroup={questionGroup}
                          part={part}
                          setIsEditting={() =>
                            setEdittingQuestionGroup({
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
                            setEdittingQuestionGroup({
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
                        handleQuestionSelectAnswer={handleQuestionSelectAnswer}
                        multipleChoiceArray={questionGroup.multipleChoiceArray}
                        divRefs={divRefs}
                        currentDivIndex={currentDivIndex}
                        // handleMouseDown={handleMouseDown}
                        // handleKeyDown={handleKeyDown}
                      />
                    )}
                    {questionGroup.type === "SUMMARY_COMPLETION" && (
                      <SummaryCompletionRender
                        summaryCompletion={questionGroup.summaryCompletion}
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

export default ResizePannelGroup;
