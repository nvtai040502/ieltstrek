'use client';

import { useEffect, useState } from 'react';
import { UpdateListMatchingChoicesForm } from '@/components/question-type/matching/matching-choices-update-form';
import UpdateMatchingSentenceForm from '@/components/question-type/matching/update-form';
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

      {/* <UpdateIdentifyingInformationItemForm />

      <UpdateMultiOneForm />
      <UpdateChoiceForm />
      <UpdateMultiMoreForm />

      <UpdateQuestionGroupForm />
      <DeleteQuestionGroupForm />

      <RichTextEditor />

      <CreatePassageForm />
      <UpdatePassageForm />
      <UpdatePassageMultiHeadingForm />

      <UpdateMatchingHeadingForm /> */}

      {/* <UpdateMatchingSentenceForm /> */}

      {/* <UpdateListMatchingChoicesForm /> */}
    </>
  );
}
