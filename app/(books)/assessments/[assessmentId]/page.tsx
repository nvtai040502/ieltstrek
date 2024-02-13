import { notFound } from 'next/navigation'
import { TestExamContentRender } from '@/components/test-exam/render/content'
import { TextExamHeaderRender } from '@/components/test-exam/render/header'
import { db } from '@/lib/db'

interface AssessmentIdPageProps {
  params: {
    assessmentId: string
  }
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    },
    include: {
      parts: {
        orderBy: {
          order: 'asc'
        },
        include: {
          questions: {
            orderBy: {
              questionNumber: 'asc'
            }
          }
        }
      }
    }
  })
  if (!assessment) {
    return notFound()
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <TextExamHeaderRender />
      <TestExamContentRender assessment={assessment} />
    </div>
  )
}

export default AssessmentIdPage
