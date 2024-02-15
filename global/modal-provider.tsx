'use client';

import { useEffect, useState } from 'react';
import { UpdateChoiceForm } from '@/components/question-type/multiple-choice/choice/update-form';
import { UpdateMultiMoreForm } from '@/components/question-type/multiple-choice/multi-more/update-form';
import { UpdateMultiOneForm } from '@/components/question-type/multiple-choice/multi-one/update-form';
import { CreateAssessmentForm } from '@/components/test-exam/assessment/create-form';
import { UpdatePartForm } from '@/components/test-exam/part/update-form';
import { CreatePassageForm } from '@/components/test-exam/passage/create-form';
import { CreateQuestionGroupForm } from '@/components/test-exam/question-group/create-form';

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

      <CreatePassageForm />

      <UpdateMultiOneForm />
      <UpdateMultiMoreForm />
      <UpdateChoiceForm />
    </>
  );
}
