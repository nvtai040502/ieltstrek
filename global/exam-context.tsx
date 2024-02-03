import { AssessmentExtended } from "@/types/db"
import { Assessment } from "@prisma/client"
import { Dispatch, SetStateAction, createContext } from "react"

interface ExamContextProps {
  activeTab: string
  selectedAssessment: AssessmentExtended | null
  setSelectedAssessment: Dispatch<SetStateAction<AssessmentExtended|null>>
  setActiveTab: Dispatch<SetStateAction<string>>
}
export const ExamContext = createContext<ExamContextProps>({
  activeTab: "",
  selectedAssessment: null,
  setSelectedAssessment: () => {},
  setActiveTab: () => {},
})