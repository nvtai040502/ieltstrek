'use client';

import { useContext } from 'react';
import { ExamContext } from '@/global/exam-context';
import { ActionButton } from '../action-button';

export function PassageRender() {
  const { selectedPart } = useContext(ExamContext);
  const passage = selectedPart?.passage;
  if (!selectedPart) {
    return null;
  }
  if (!passage) {
    return (
      <ActionButton
        actionType="create"
        editType="createPassage"
        data={{ part: selectedPart }}
      />
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <p className=" font-bold"> {passage.title} </p>
          <p className=" italic font-light">{passage.description}</p>
        </div>
        <ActionButton
          actionType="update"
          editType="editPassage"
          data={{ passage }}
        />
      </div>
      {passage.type === 'PASSAGE_SIMPLE' && (
        <p className="whitespace-pre-line"> {passage.content} </p>
      )}

      {passage.type === 'PASSAGE_MULTI_HEADING' &&
        passage.passageHeadingList.map((passageHeading) => {
          return (
            <div key={passageHeading.id}>
              <div className="flex justify-between">
                <p className="font-bold"> {passageHeading.title}</p>
                <ActionButton
                  actionType="update"
                  editType="editPassageMultiHeading"
                  data={{ passageHeading }}
                />
              </div>
              <p className=" whitespace-pre-line ">{passageHeading.content}</p>
            </div>
          );
        })}
    </div>
  );
}
