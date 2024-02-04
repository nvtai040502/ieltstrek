"use client";

import { useEffect, useState } from "react";
import { UpdateNoteCompletionForm } from "../books/question-type/note-completion/update";

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
    </>
  )
}