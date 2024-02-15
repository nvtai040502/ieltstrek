import { useContext } from 'react'
import { AnswerType, ExamContext } from './exam-context'

export const useExamHandler = () => {
  const {
    userAnswers,
    questionRefs,
    setCurrentRef,
    currentRef,
    setActiveTab,
    selectedAssessment,
    setUserAnswers,
    selectedPart,
  } = useContext(ExamContext)

  function handleSubmit() {
    console.log('User Answers:', userAnswers)
  }
  function handleAnswerSelected(props: AnswerType) {
    const { questionId, type } = props

    // Update or add the answer based on the type
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]

      if (type === 'MULTIPLE_CHOICE_ONE_ANSWER') {
        const updatedAnswerIndex = updatedAnswers.findIndex(
          (prev) => prev.questionId === questionId
        )

        if (updatedAnswerIndex !== -1) {
          updatedAnswers[updatedAnswerIndex] = {
            ...updatedAnswers[updatedAnswerIndex],
            type: 'MULTIPLE_CHOICE_ONE_ANSWER',
            choiceId: props.choiceId,
          }
        } else {
          updatedAnswers.push({
            questionId: questionId,
            type: 'MULTIPLE_CHOICE_ONE_ANSWER',
            choiceId: props.choiceId,
          })
        }
      } else if (type === 'MATCHING') {
        // Add handling for 'MATCHING' type here
      }

      return updatedAnswers
    })
  }
  function handleNextQuestion() {
    if (!selectedAssessment || !selectedPart) {
      return null
    }
    if (
      currentRef + 1 <
      selectedPart.questionGroups[selectedPart.questionGroups.length - 1]
        .endQuestionNumber
    ) {
      setCurrentRef(currentRef + 1)
      const ref = questionRefs[currentRef + 1].current
      if (ref) {
        ref.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        ref.focus()
      }
    } else {
      const nextPart = selectedAssessment.parts.find(
        (part) => part.order === selectedPart.order + 1
      )
      if (nextPart) {
        setCurrentRef(nextPart.questionGroups[0].startQuestionNumber - 1)
        setActiveTab(nextPart.id)
      } else {
        setActiveTab('delivering')
      }
    }
  }

  function handlePrevQuestion() {
    if (!selectedAssessment || !selectedPart) {
      return null
    }
    if (currentRef + 1 >= selectedPart.questionGroups[0].startQuestionNumber) {
      setCurrentRef(currentRef - 1)
      const ref = questionRefs[currentRef - 1].current
      if (ref) {
        ref.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        ref.focus()
      }
    } else {
      const prevPart = selectedAssessment.parts.find(
        (part) => part.order === selectedPart.order - 1
      )
      if (prevPart) {
        setActiveTab(prevPart.id)
        setCurrentRef(prevPart.questionGroups[0].startQuestionNumber - 1)
      }
    }
  }
  const isHasNextQuestion = questionRefs
    .slice(currentRef + 1)
    .some((ref) => ref.current !== null)
  const isHasPrevQuestion = currentRef > 0
  return {
    handleAnswerSelected,
    handleSubmit,
    handleNextQuestion,
    handlePrevQuestion,
    isHasNextQuestion,
    isHasPrevQuestion,
  }
}
