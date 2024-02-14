import { useContext } from 'react'
import { ExamContext } from './exam-context'

export const useExamHandler = () => {
  const {
    userAnswers,
    questionRefs,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    setActiveTab,
    selectedAssessment,
  } = useContext(ExamContext)
  const handleSubmit = () => {
    console.log('User Answers:', userAnswers)
  }

  return { handleSubmit }
}
