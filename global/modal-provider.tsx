"use client";

import { useEffect, useState } from "react";
import { UpdateQuestionGroupForm } from "@/components/books/question-group/update-form";
import { UpdateIdentifyingInformationItemForm } from "@/components/books/question-type/identifying-information/update-form";
import { UpdateMultipleChoiceForm } from "@/components/books/question-type/multiple-choice/update-form";
import { UpdateChoiceForm } from "@/components/books/question-type/multiple-choice/choice/choice-update-form";
import { DeleteQuestionGroupForm } from "@/components/books/question-group/delete-form";

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

      <UpdateMultipleChoiceForm />
      <UpdateChoiceForm />

      <UpdateQuestionGroupForm />
      <DeleteQuestionGroupForm />
    </>
  );
}
