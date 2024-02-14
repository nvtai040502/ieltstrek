import { useContext } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ExamContext } from '@/global/exam-context'
import { PartExtended } from '@/types/test-exam'
import { Button } from '@/components/ui/button'

function ButtonNavigationQuestion() {
  const {
    currentQuestionIndex,
    questionRefs,
    setCurrentQuestionIndex,
    selectedAssessment,
    setActiveTab,
    selectedPart,
  } = useContext(ExamContext)
  if (!selectedAssessment || !selectedPart) {
    return null
  }

  const isHasNextQuestion = currentQuestionIndex < questionRefs.length - 1
  const isHasPrevQuestion = currentQuestionIndex > 0
  const handleNextQuestion = (part: PartExtended, i: number) => {
    if (
      currentQuestionIndex + 1 <
      part.questionGroups[part.questionGroups.length - 1].endQuestionNumber
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      const ref = questionRefs[currentQuestionIndex + 1].current
      if (ref) {
        ref.scrollIntoView({ behavior: 'auto' })
        ref.focus()
      }
    } else {
      if (i < selectedAssessment.parts.length - 1) {
        setCurrentQuestionIndex(
          selectedAssessment.parts[i + 1].questionGroups[0]
            .startQuestionNumber - 1
        )
        setActiveTab(String(selectedAssessment.parts[i + 1].id))
      } else {
        setActiveTab('delivering')
      }
    }
  }

  const handlePrevQuestion = (part: PartExtended, i: number) => {
    if (
      currentQuestionIndex + 1 >=
      part.questionGroups[0].startQuestionNumber
    ) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const ref = questionRefs[currentQuestionIndex - 1].current
      if (ref) {
        console.log(ref)
        ref.scrollIntoView({ behavior: 'auto' })
        ref.focus()
      }
    } else {
      setActiveTab(selectedAssessment.parts[i - 1].id)
      setCurrentQuestionIndex(
        selectedAssessment.parts[i - 1].questionGroups[0].startQuestionNumber -
          1
      )
    }
  }
  return (
    <div className="absolute inset-0 h-20">
      <Button
        onClick={() => handlePrevQuestion(selectedPart, selectedPart.order)}
        disabled={!isHasPrevQuestion}
        size="xl"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => handleNextQuestion(selectedPart, selectedPart.order)}
        disabled={!isHasNextQuestion}
        size="xl"
      >
        <ArrowRight />
      </Button>
    </div>
  )
}

export default ButtonNavigationQuestion
