"use client";

import { useEffect, useState } from "react";
import { UpdateQuestionGroupForm } from "@/components/books/question-group/update-form";
import { UpdateIdentifyingInformationItemForm } from "@/components/books/question-type/identifying-information/update-form";
import { DeleteQuestionGroupForm } from "@/components/books/question-group/delete-form";
import RichTextEditor from "@/components/books/question-type/note-completion/rich-text-editor";
import { UpdateMultiOneForm } from "@/components/books/question-type/multiple-choice/multi-one/update-form";
import { UpdateChoiceForm } from "@/components/books/question-type/multiple-choice/choice/choice-update-form";
import { UpdateMultiMoreForm } from "@/components/books/question-type/multiple-choice/multi-more/update-form";
import { CreateQuestionGroupForm } from "@/components/books/question-group/create-form";
import { CreatePassageForm } from "@/components/books/passage/create-form";
import { UpdatePassageForm } from "@/components/books/passage/update-form";
import { UpdatePassageMultiHeadingForm } from "@/components/books/passage/multi-heading/update-form";
import { UpdateMatchingHeadingForm } from "@/components/books/question-type/matching-heading/update-form";

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
      <UpdateIdentifyingInformationItemForm />

      {/* Multiple Choice */}
      <UpdateMultiOneForm />
      <UpdateChoiceForm />
      <UpdateMultiMoreForm />

      {/* Question Group */}
      <UpdateQuestionGroupForm />
      <DeleteQuestionGroupForm />
      <CreateQuestionGroupForm />

      <RichTextEditor />

      {/* Passage */}
      <CreatePassageForm />
      <UpdatePassageForm />
      <UpdatePassageMultiHeadingForm />

      <UpdateMatchingHeadingForm />
    </>
  );
}
