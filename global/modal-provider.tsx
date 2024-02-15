'use client';

import { useEffect, useState } from 'react';
import { IdentifyInfoUpdateForm } from '@/components/question-type/identify-info/update-form';
import { ChoiceUpdateForm } from '@/components/question-type/multiple-choice/choice/update-form';
import { MultiMoreUpdateForm } from '@/components/question-type/multiple-choice/multi-more/update-form';
import { MultiOneUpdateForm } from '@/components/question-type/multiple-choice/multi-one/update-form';
import { CreateAssessmentForm } from '@/components/test-exam/assessment/create-form';
import { UpdatePartForm } from '@/components/test-exam/part/update-form';
import { CreatePassageForm } from '@/components/test-exam/passage/create-form';
import { CreateQuestionGroupForm } from '@/components/test-exam/question-group/create-form';
import { DeleteQuestionGroupForm } from '@/components/test-exam/question-group/delete-form';

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

      <UpdatePartForm />

      <CreateQuestionGroupForm />
      <DeleteQuestionGroupForm />

      <CreatePassageForm />

      <MultiOneUpdateForm />
      <MultiMoreUpdateForm />
      <ChoiceUpdateForm />

      <IdentifyInfoUpdateForm />
    </>
  );
}
