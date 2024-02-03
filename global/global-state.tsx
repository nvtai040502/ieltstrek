"use client";

import { FC, useState } from "react";
import { ExamContext } from "./exam-context";
import { AssessmentExtended } from "@/types/db";

interface GlobalStateProps {
  children: React.ReactNode;
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentExtended | null>(null);
  return (
    <ExamContext.Provider
      value={{
        activeTab,
        selectedAssessment,
        setSelectedAssessment,
        setActiveTab,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};
