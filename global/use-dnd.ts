import { DragEvent, useContext } from 'react'
import { DndContext } from './dnd-context'
import { ExamContext } from './exam-context'

export const useDnd = () => {
  const {
    matchingChoiceId,
    questionGroupId,
    questionId,
    setQuestionId,
    setMatchingChoiceId,
    setQuestionGroupId,
  } = useContext(DndContext)
  const { selectedPart, setUserAnswers, userAnswers } = useContext(ExamContext)
  const handleDragEnd = () => {
    const questionGroup = selectedPart?.questionGroups.find(
      (questionGroup) => questionGroup.id === questionGroupId
    )
    if (!questionGroup) {
      return
    }
    const question = questionGroup.questions.find(
      (question) => question.id === questionId
    )
    if (!question) {
      return
    }
    const matchingChoice =
      questionGroup.matching?.matchingChoiceGroup.matchingChoiceList.find(
        (matchingChoice) => matchingChoice.id === matchingChoiceId
      )
    if (!matchingChoice) {
      return
    }

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question.id]: matchingChoice.content,
    }))
  }
  const handleDragStart = (
    questionGroupId: string,
    matchingChoiceId: string
  ) => {
    setQuestionGroupId(questionGroupId)
    setMatchingChoiceId(matchingChoiceId)
  }
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }
  return { handleDragEnd, handleDragStart, handleDragOver }
}
