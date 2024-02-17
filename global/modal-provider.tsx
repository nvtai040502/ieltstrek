'use client';

import { useEffect, useState } from 'react';
import OpenAssessmentModal from '@/components/open-assessment-modal';
import { CompletionAnswerUpdateForm } from '@/components/question-type/completion/answer-update-form';
import CompletionParagraphUpdateForm from '@/components/question-type/completion/paragraph-update-form';
import { IdentifyInfoUpdateForm } from '@/components/question-type/identify-info/update-form';
import { ChoiceUpdateForm } from '@/components/question-type/multiple-choice/choice/update-form';
import { MultiMoreUpdateForm } from '@/components/question-type/multiple-choice/multi-more/update-form';
import { MultiOneUpdateForm } from '@/components/question-type/multiple-choice/multi-one/update-form';
import { CreateAssessmentForm } from '@/components/test-exam/assessment/create-form';
import { UpdatePartForm } from '@/components/test-exam/part/update-form';
import { CreatePassageForm } from '@/components/test-exam/passage/create-form';
import { PassageUpdateForm } from '@/components/test-exam/passage/update-form';
import { CreateQuestionGroupForm } from '@/components/test-exam/question-group/create-form';
import { DeleteQuestionGroupForm } from '@/components/test-exam/question-group/delete-form';
import SubmitModal from '@/components/test-exam/submit-modal';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateAssessmentForm />
      <OpenAssessmentModal />

      <UpdatePartForm />

      <CreatePassageForm />
      <PassageUpdateForm />

      <CreateQuestionGroupForm />
      <DeleteQuestionGroupForm />

      <MultiOneUpdateForm />
      <MultiMoreUpdateForm />
      <ChoiceUpdateForm />

      <IdentifyInfoUpdateForm />

      <SubmitModal />

      <CompletionParagraphUpdateForm />
      <CompletionAnswerUpdateForm />
    </>
  );
}
