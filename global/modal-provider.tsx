"use client";

import { CreatePassageForm } from "@/components/books/passage/create-form";
import { UpdatePassageMultiHeadingForm } from "@/components/books/passage/multi-heading/update-form";
import { UpdatePassageForm } from "@/components/books/passage/update-form";
import { CreateQuestionGroupForm } from "@/components/books/question-group/create-form";
import { DeleteQuestionGroupForm } from "@/components/books/question-group/delete-form";
import { UpdateQuestionGroupForm } from "@/components/books/question-group/update-form";
import { UpdateIdentifyingInformationItemForm } from "@/components/question-type/identifying-information/update-form";
import { UpdateMatchingHeadingForm } from "@/components/question-type/matching-heading/update-form";
import { UpdateListMatchingChoicesForm } from "@/components/question-type/matching-sentence/matching-choices-update-form";
import UpdateMatchingSentenceForm from "@/components/question-type/matching-sentence/update-form";
import { UpdateChoiceForm } from "@/components/question-type/multiple-choice/choice/choice-update-form";
import { UpdateMultiMoreForm } from "@/components/question-type/multiple-choice/multi-more/update-form";
import { UpdateMultiOneForm } from "@/components/question-type/multiple-choice/multi-one/update-form";
import RichTextEditor from "@/components/question-type/note-completion/rich-text-editor";
import { useEffect, useState } from "react";
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
      {/* <UpdateIdentifyingInformationItemForm />

      <UpdateMultiOneForm />
      <UpdateChoiceForm />
      <UpdateMultiMoreForm />

      <UpdateQuestionGroupForm />
      <DeleteQuestionGroupForm />
      <CreateQuestionGroupForm />

      <RichTextEditor />

      <CreatePassageForm />
      <UpdatePassageForm />
      <UpdatePassageMultiHeadingForm />

      <UpdateMatchingHeadingForm /> */}

      <UpdateMatchingSentenceForm />

      <UpdateListMatchingChoicesForm />
    </>
  );
}
