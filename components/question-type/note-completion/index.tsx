'use client';

import { CompletionExtended } from '@/types/test-exam';
import ParagraphRender from './paragraph-render';
import { ActionButton } from '@/components/test-exam/action-button';

interface NoteCompletionRenderProps {
  noteCompletion?: CompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion
}: NoteCompletionRenderProps) => {
  if (!noteCompletion) {
    return null;
  }

  return (
    <>
      <ActionButton
        actionType="update"
        editType="editNoteCompletion"
        data={{ noteCompletion }}
      />

      <ParagraphRender noteCompletion={noteCompletion} />
    </>
  );
};
