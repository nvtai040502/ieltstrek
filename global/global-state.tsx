"use client";

import { FC, RefObject, createRef, useEffect, useState } from "react";
import { ExamContext } from "./exam-context";
import { AssessmentExtended } from "@/types/db";

interface GlobalStateProps {
  children: React.ReactNode;
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentExtended | null>(null);
    const [questionRefs, setQuestionRefs] = useState<RefObject<HTMLDivElement | HTMLInputElement>[]>([]);
  
  useEffect(() => {
    if (!selectedAssessment) {
      return;
    }
    setQuestionRefs((prevRefs) =>
      Array.from({ length: selectedAssessment.questions.length }, (_, index) =>
        index < prevRefs.length ? prevRefs[index] : createRef<HTMLDivElement | HTMLInputElement>()
      )
    );
    setActiveTab(String(selectedAssessment.parts[0].id));
  }, [selectedAssessment]);
  return (
    <ExamContext.Provider
      value={{
        activeTab,
        selectedAssessment,
        questionRefs,
        setQuestionRefs,
        setSelectedAssessment,
        setActiveTab,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};
