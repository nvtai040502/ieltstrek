import { DragEvent, useContext } from 'react'
import { DndContext } from './dnd-context'
import { AnswerType, ExamContext } from './exam-context'

export const useDnd = () => {
  const {
    matchingChoiceId,
    questionGroupId,
    questionId,
    setQuestionId,
    matchingChoiceList,
    setMatchingChoiceList,
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
    const existAnswer = userAnswers.find(
      (prev) => prev.questionId === question.id
    )

    if (existAnswer && existAnswer.type === 'MATCHING') {
      setMatchingChoiceList((prevList) =>
        prevList.map((choice) =>
          choice.id === matchingChoiceId
            ? { ...choice, content: '' }
            : choice.id === existAnswer.matchingChoiceId
              ? { ...choice, content: existAnswer.content }
              : choice
        )
      )
    } else {
      setMatchingChoiceList((prevList) =>
        prevList.map((choice) =>
          choice.id === matchingChoiceId ? { ...choice, content: '' } : choice
        )
      )
    }
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      const findAnswerIndex = updatedAnswers.findIndex(
        (prev) => prev.questionId === question.id && prev.type === 'MATCHING'
      )
      if (findAnswerIndex !== -1) {
        updatedAnswers[findAnswerIndex] = {
          ...updatedAnswers[findAnswerIndex],
          type: 'MATCHING',
          content: matchingChoice.content,
          matchingChoiceId: matchingChoice.id,
        }
      } else {
        updatedAnswers.push({
          questionId: question.id,
          type: 'MATCHING',
          matchingChoiceId: matchingChoice.id,
          content: matchingChoice.content,
        })
      }
      return updatedAnswers
    })
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
