import { AssessmentExtended } from "@/types/db"
import { Assessment } from "@prisma/client"
import { Dispatch, SetStateAction, createContext } from "react"

interface IeltExamContextProps {
  activeTab: string
  assessmentExtended: AssessmentExtended | null
  setAssessmentExtended: Dispatch<SetStateAction<AssessmentExtended|null>>
  setActiveTab: Dispatch<SetStateAction<string>>
}
export const IeltExamContext = createContext<IeltExamContextProps>({
  activeTab: "",
  assessmentExtended: null,
  setAssessmentExtended: () => {},
  setActiveTab: () => {},
})