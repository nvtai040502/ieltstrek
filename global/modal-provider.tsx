"use client";

import { useEffect, useState } from "react";
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

      <UpdateIdentifyingInformationItemForm />
    </>
  )
}