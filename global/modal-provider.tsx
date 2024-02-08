"use client";

import { useEffect, useState } from "react";
import { UpdateQuestionGroupForm } from "@/components/books/question-group/update-form";
import { UpdateIdentifyingInformationItemForm } from "@/components/books/question-type/identifying-information/update-form";
import { UpdateMultiOneForm } from "@/components/books/question-type/multi-one/update-form";
import { UpdateChoiceForm } from "@/components/books/question-type/multi-one/choice/choice-update-form";
import { DeleteQuestionGroupForm } from "@/components/books/question-group/delete-form";
import RichTextEditor from "@/components/books/question-type/note-completion/rich-text-editor";

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

      <UpdateMultiOneForm />
      <UpdateChoiceForm />

      <UpdateQuestionGroupForm />
      <DeleteQuestionGroupForm />

      <RichTextEditor />
    </>
  );
}
