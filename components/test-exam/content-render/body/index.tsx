'use client';

import { useContext } from 'react';
import { ExamContext } from '@/global/exam-context';
import { CompletionRender } from '@/components/question-type/completion';
import { IdentifyInfoRender } from '@/components/question-type/identify-info/render';
import { MatchingRender } from '@/components/question-type/matching';
import { TestMatchingRender } from '@/components/question-type/matching/test';
import { MultiMoreRender } from '@/components/question-type/multiple-choice/multi-more/render';
import { MultiOneRender } from '@/components/question-type/multiple-choice/multi-one/render';
import { ActionButton } from '@/components/test-exam/action-button';
import { buttonVariants } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PassageRender } from '../../passage/passage-render';

const PartBodyContentRender = () => {
  const { selectedPart } = useContext(ExamContext);
  if (!selectedPart) {
    return null;
  }
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
            {selectedPart.passage ? (
              <PassageRender passage={selectedPart.passage} />
            ) : (
              <ActionButton
                actionType="create"
                editType="createPassage"
                data={{ part: selectedPart }}
              >
                <div className={buttonVariants()}>New Passage</div>
              </ActionButton>
            )}

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
              >
                <div className={buttonVariants()}>New Question Group</div>
              </ActionButton>
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

                  {questionGroup.type === 'MULTIPLE_CHOICE_ONE_ANSWER' &&
                    questionGroup.multiOneList.map((multiOne) => (
                      <MultiOneRender multiOne={multiOne} key={multiOne.id} />
                    ))}
                  {questionGroup.type === 'MULTIPLE_CHOICE_MORE_ANSWERS' &&
                    questionGroup.multiMoreList.map((multiMore) => (
                      <MultiMoreRender
                        multiMore={multiMore}
                        key={multiMore.id}
                      />
                    ))}
                  {questionGroup.type === 'IDENTIFYING_INFORMATION' &&
                    questionGroup.identifyInfoList.map((identifyInfo) => (
                      <IdentifyInfoRender
                        identifyInfo={identifyInfo}
                        key={identifyInfo.id}
                      />
                    ))}
                  {(questionGroup.type === 'COMPLETION' ||
                    questionGroup.type === 'TABLE_COMPLETION') && (
                    <CompletionRender questionGroup={questionGroup} />
                  )}
                  {questionGroup.type === 'MATCHING' && (
                    // <MatchingRender questionGroup={questionGroup} />
                    <TestMatchingRender questionGroup={questionGroup} />
                  )}
                  {/* {questionGroup.type === 'MATCHING_HEADING' && (
                    <MatchingHeadingRender
                      matchingHeading={questionGroup.matchingHeading}
                    />
                  )}
                   */}
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
