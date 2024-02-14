import { Dispatch, SetStateAction, createContext } from 'react'
import { MatchingChoice } from '@prisma/client'

interface DndContextProps {
  questionGroupId: string
  matchingChoiceList: MatchingChoice[]
  prevContent: string
  setPrevContent: Dispatch<SetStateAction<string>>
  setMatchingChoiceList: Dispatch<SetStateAction<MatchingChoice[]>>
  setQuestionGroupId: Dispatch<SetStateAction<string>>
  matchingChoiceId: string
  setMatchingChoiceId: Dispatch<SetStateAction<string>>
  questionId: string
  setQuestionId: Dispatch<SetStateAction<string>>
}

export const DndContext = createContext<DndContextProps>({
  questionGroupId: '',
  matchingChoiceId: '',
  questionId: '',
  matchingChoiceList: [],
  prevContent: '',
  setPrevContent: () => {},
  setMatchingChoiceList: () => {},
  setQuestionId: () => {},
  setMatchingChoiceId: () => {},
  setQuestionGroupId: () => {},
})
