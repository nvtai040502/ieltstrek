import { Dispatch, RefObject, SetStateAction, createContext } from 'react'
import { QuestionType } from '@prisma/client'
import { AssessmentExtended, PartExtended } from '@/types/test-exam'

export type AnswerType =
  | {
      questionId: string
      type: 'MULTIPLE_CHOICE_ONE_ANSWER'
      content: string
      choiceId: string
    }
  | {
      questionId: string
      type: 'NOTE_COMPLETION'
      content: string
    }
  | {
      questionId: string
      type: 'MATCHING'
      content: string
      matchingChoiceId: string
    }

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
  userAnswers: AnswerType[]
  setUserAnswers: Dispatch<SetStateAction<AnswerType[]>>
}

export const ExamContext = createContext<ExamContextProps>({
  activeTab: '',
  selectedAssessment: null,
  questionRefs: [],
  userAnswers: [],
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
