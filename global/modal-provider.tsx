"use client";

import { useEffect, useState } from "react";
import { UpdateNoteCompletionForm } from "../components/books/question-type/note-completion/update";
import { UpdateNoteCompletionGroupItemForm } from "@/components/books/question-type/note-completion/group-item-update";
import { UpdateIdentifyingInformationItemForm } from "@/components/books/question-type/identifying-information/update-form";

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
      <UpdateNoteCompletionForm />
      <UpdateNoteCompletionGroupItemForm />

      <UpdateIdentifyingInformationItemForm />
    </>
  )
}