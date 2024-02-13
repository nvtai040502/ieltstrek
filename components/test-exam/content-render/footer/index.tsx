import { Fragment, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { TabsList } from '@/components/ui/tabs'
import { ExamContext } from '@/global/exam-context'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

function FooterContentRender() {
  const {
    selectedAssessment,
    activeTab,
    setActiveTab,
    questionRefs,
    setCurrentQuestionIndex,
    currentQuestionIndex
  } = useContext(ExamContext)
  if (!selectedAssessment) {
    return null
  }
  const handleMoveToDiv = (questionIndex: number) => {
    questionRefs[questionIndex].current?.focus()
    setCurrentQuestionIndex(questionIndex)
  }
  return (
    <TabsList className="flex justify-between items-center h-40">
      {selectedAssessment.parts.map((part) => (
        <Fragment key={part.id}>
          {activeTab === part.id ? (
            <div
              key={part.id}
              className="flex items-center justify-center gap-8 w-full"
            >
              <p className="px-1 whitespace-nowrap">{part.title}</p>
              <div className="flex items-center">
                {part.questions.map((question) => (
                  <div
                    key={question.id}
                    role="button"
                    className="hover:border hover:border-secondary-foreground"
                    onClick={() => handleMoveToDiv(question.questionNumber - 1)}
                  >
                    <p
                      className={cn(
                        'px-2',
                        currentQuestionIndex === question.questionNumber - 1
                          ? 'border border-secondary-foreground'
                          : ''
                      )}
                    >
                      {question.questionNumber}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Button
              className="w-full rounded-none border-none"
              variant="outline"
              onClick={() => setActiveTab(part.id)}
            >
              {part.title}
            </Button>
          )}
        </Fragment>
      ))}
      <Button variant="secondary" onClick={() => setActiveTab('delivering')}>
        <Check className="h-4 w-4" />
      </Button>
    </TabsList>
  )
}

export default FooterContentRender
