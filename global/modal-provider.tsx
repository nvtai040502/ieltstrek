"use client";

import { useEffect, useState } from "react";
import { UpdateIdentifyingInformationItemForm } from "@/components/question-type/identifying-information/update-form";
import { UpdateChoiceForm } from "@/components/question-type/multiple-choice/choice/choice-update-form";

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
      
      <UpdateChoiceForm />
    </>
  )
}