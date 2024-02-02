"use client"

import { FC, useState } from "react"
import { IeltExamContext } from "./exam-context"
import { AssessmentExtended } from "@/types/db"

interface GlobalStateProps {
  children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({children}) => {
  const [activeTab, setActiveTab] = useState<string>("")
  const [assessmentExtended, setAssessmentExtended] = useState<AssessmentExtended|null>(null)
    return (
    <IeltExamContext.Provider
      value={{
        activeTab,
        assessmentExtended,
        setAssessmentExtended,
        setActiveTab,
      }}
    >
      {children}
    </IeltExamContext.Provider>
  )
}