import { useContext } from 'react'
import { ExamContext } from './exam-context'

export const useExamHandler = () => {
  const {
    userAnswers,
    questionRefs,
    setCurrentRef,
    currentRef,
    setActiveTab,
    selectedAssessment,
    selectedPart,
  } = useContext(ExamContext)

  function handleSubmit() {
    console.log('User Answers:', userAnswers)
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
      console.log(ref)
      if (ref) {
        ref.scrollIntoView({ behavior: 'auto' })
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
        ref.scrollIntoView({ behavior: 'auto' })
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
    handleSubmit,
    handleNextQuestion,
    handlePrevQuestion,
    isHasNextQuestion,
    isHasPrevQuestion,
  }
}
