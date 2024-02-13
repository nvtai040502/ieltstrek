'use client';

import { useContext, useEffect } from 'react';
import { PassageRender } from '@/components/books/passage/render';
import { ActionButton } from '@/components/test-exam/action-button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ExamContext } from '@/global/exam-context';
import { PartExtended } from '@/types/test-exam';

const PartBodyContentRender = () => {
  const { questionRefs, setCurrentQuestionIndex, selectedPart } =
    useContext(ExamContext);
  if (!selectedPart) {
    return null;
  }
  // useEffect(() => {
  //   if (questionRefs.length && part.questionGroups.length) {
  //     questionRefs[
  //       part.questionGroups[0].startQuestionNumber - 1
  //     ].current?.focus()
  //     setCurrentQuestionIndex(part.questionGroups[0].startQuestionNumber - 1)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
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
            {/* <PassageRender part={part} /> */}
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
                data={{ part: selectedPart }}
              />
            </div>

            {selectedPart.questionGroups.map((questionGroup) => {
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

                  {/* {questionGroup.type === 'MULTIPLE_CHOICE' && (
                      <MultiOneArrayRender
                        multiOneArray={questionGroup.multipleChoiceArray}
                      />
                    )}
                    {questionGroup.type === 'MULTIPLE_CHOICE_MORE_ANSWERS' && (
                      <MultiMoreArrayRender
                        multiMoreArray={questionGroup.multiMoreArray}
                      />
                    )}

                    {questionGroup.type === 'MATCHING_HEADING' && (
                      <MatchingHeadingRender
                        matchingHeading={questionGroup.matchingHeading}
                      />
                    )}
                    {questionGroup.type === 'TABLE_COMPLETION' && (
                      <NoteCompletionRender
                        noteCompletion={questionGroup.noteCompletion}
                      />
                    )}
                    {questionGroup.type === 'IDENTIFYING_INFORMATION' && (
                      <IdentifyingInformationRender
                        identifyingInformation={
                          questionGroup.identifyingInformation
                        }
                      />
                    )}
                    {questionGroup.type === 'NOTE_COMPLETION' && (
                      <NoteCompletionRender
                        noteCompletion={questionGroup.noteCompletion}
                      />
                    )}
                    {questionGroup.type === 'MATCHING_SENTENCE' && (
                      <MatchingSentenceRender questionGroup={questionGroup} />
                    )} */}
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

export default PartBodyContentRender;
