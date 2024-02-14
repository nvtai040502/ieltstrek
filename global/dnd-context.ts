import { Dispatch, SetStateAction, createContext } from 'react'

interface DndContextProps {
  questionGroupId: string
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
  setQuestionId: () => {},
  setMatchingChoiceId: () => {},
  setQuestionGroupId: () => {},
})
