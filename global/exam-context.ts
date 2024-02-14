import { Dispatch, RefObject, SetStateAction, createContext } from 'react'
import { AssessmentExtended, PartExtended } from '@/types/test-exam'

interface ExamContextProps {
  activeTab: string
  selectedAssessment: AssessmentExtended | null
  questionRefs: RefObject<HTMLDivElement | HTMLInputElement>[]
  currentQuestionIndex: number
  selectedPart: PartExtended | null
  setSelectedPart: Dispatch<SetStateAction<PartExtended | null>>
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>
  setQuestionRefs: Dispatch<
    SetStateAction<RefObject<HTMLDivElement | HTMLInputElement>[]>
  >
  setSelectedAssessment: Dispatch<SetStateAction<AssessmentExtended | null>>
  setActiveTab: Dispatch<SetStateAction<string>>
  listHeading: string[]
  setListHeading: Dispatch<SetStateAction<string[]>>
  userAnswers: { [key: string]: string | string[] }
  setUserAnswers: Dispatch<SetStateAction<{ [key: string]: string | string[] }>>
}

export const ExamContext = createContext<ExamContextProps>({
  activeTab: '',
  selectedAssessment: null,
  questionRefs: [],
  userAnswers: {},
  listHeading: [],
  selectedPart: null,
  setSelectedPart: () => {},
  setListHeading: () => {},
  setUserAnswers: () => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  setQuestionRefs: () => {},
  setSelectedAssessment: () => {},
  setActiveTab: () => {},
})
