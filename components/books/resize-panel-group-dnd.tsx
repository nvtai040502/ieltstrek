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
import { PassageRender } from "./passage/render";
import { ExamContext } from "@/global/exam-context";
import { ActionButton } from "./action-button";
import { PassageDragAndDropRender } from "./passage/dnd-render";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { QuestionType } from "@prisma/client";
import { MultiOneArrayRender } from "../question-type/multiple-choice/multi-one";
import { MultiMoreArrayRender } from "../question-type/multiple-choice/multi-more";
import { MatchingHeadingRender } from "../question-type/matching-heading";
import { NoteCompletionRender } from "../question-type/note-completion";
import { IdentifyingInformationRender } from "../question-type/identifying-information";

const ResizePanelGroupDragAndDrop = ({ part }: { part: PartExtended }) => {
  const {
    questionRefs,
    setCurrentQuestionIndex,
    setUserAnswers,
    listHeading,
    userAnswers,
    setListHeading,
  } = useContext(ExamContext);

  useEffect(() => {
    if (questionRefs.length && part.questionGroups.length) {
      questionRefs[
        part.questionGroups[0].startQuestionNumber - 1
      ].current?.focus();
      setCurrentQuestionIndex(part.questionGroups[0].startQuestionNumber - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log("🚀 ~ onDragEnd ~ result:", result);

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === QuestionType.MATCHING_HEADING) {
      const questionNumber = Number(destination.droppableId);
      const itemToRemove = listHeading[source.index];

      const updatedListHeading = listHeading.filter(
        (_, index) => index !== source.index,
      );
      setListHeading(updatedListHeading);

      setUserAnswers((prev) => {
        const updatedAnswers = { ...prev };
        updatedAnswers[questionNumber] = itemToRemove;
        return updatedAnswers;
      });

      if (userAnswers[questionNumber]) {
        setListHeading((prev) => [
          ...prev,
          userAnswers[questionNumber] as string,
        ]);
      }
    }
  };
  return (
    <div className="h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg flex-grow"
        >
          <ResizablePanel defaultSize={50} className="overflow-auto h-full">
            <ScrollArea
              type="always"
              className="w-full h-full overflow-auto pl-4 pr-8"
            >
              {/* <PassageRender part={part} /> */}
              <PassageDragAndDropRender part={part} />
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
                <ActionButton
                  actionType="create"
                  editType="createQuestionGroup"
                  data={{ part }}
                />
              </div>

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
                          <ActionButton
                            actionType="update"
                            editType="editQuestionGroup"
                            data={{ questionGroup }}
                          />
                          <ActionButton
                            actionType="delete"
                            editType="deleteQuestionGroup"
                            data={{ questionGroup }}
                          />
                        </div>
                      </div>

                      {questionGroup.type === "MULTIPLE_CHOICE" && (
                        <MultiOneArrayRender
                          multiOneArray={questionGroup.multipleChoiceArray}
                        />
                      )}
                      {questionGroup.type ===
                        "MULTIPLE_CHOICE_MORE_ANSWERS" && (
                        <MultiMoreArrayRender
                          multiMoreArray={questionGroup.multiMoreArray}
                        />
                      )}

                      {questionGroup.type === "MATCHING_HEADING" && (
                        <MatchingHeadingRender
                          matchingHeading={questionGroup.matchingHeading}
                        />
                      )}
                      {questionGroup.type === "TABLE_COMPLETION" && (
                        <NoteCompletionRender
                          noteCompletion={questionGroup.noteCompletion}
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
      </DragDropContext>
    </div>
  );
};

export default ResizePanelGroupDragAndDrop;
