'use client';

import CompletionParagraphRender from './paragraph-render';
import { ActionButton } from '@/components/test-exam/action-button';
import { CompletionExtended } from '@/types/test-exam';

interface NoteCompletionRenderProps {
  completion?: CompletionExtended | null;
}
export const CompletionRender = ({ completion }: NoteCompletionRenderProps) => {
  if (!completion) {
    return null;
  }

  return (
    <>
      <ActionButton
        actionType="update"
        editType="editNoteCompletion"
        data={{}}
      />

      <CompletionParagraphRender completion={completion} />
    </>
  );
};
