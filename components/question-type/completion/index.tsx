'use client';

import { QuestionGroupExtended } from '@/types/test-exam';
import { ActionButton } from '@/components/test-exam/action-button';
import { buttonVariants } from '@/components/ui/button';
import CompletionParagraphRender from './paragraph-render';

export const CompletionRender = ({
  questionGroup
}: {
  questionGroup: QuestionGroupExtended;
}) => {
  if (!questionGroup.completion) {
    return null;
  }

  return (
    <>
      <div className="gap-4 flex justify-between items-center">
        <ActionButton
          actionType="update"
          editType="editCompletionParagraph"
          data={{ questionGroup }}
        >
          <div className={buttonVariants()}>Update Paragraph</div>
        </ActionButton>
        <ActionButton
          actionType="update"
          editType="editCompletionAnswer"
          data={{ questionGroup }}
        >
          <div className={buttonVariants()}>Update Answers</div>
        </ActionButton>
      </div>

      <CompletionParagraphRender completion={questionGroup.completion} />
    </>
  );
};
