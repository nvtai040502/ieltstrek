import { CreateAssessmentButton } from "@/components/books/assessment/create-assessment-button"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import Link from "next/link"
const RootPage = async () => {
  const assessments = await db.assessment.findMany()
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
      <CreateAssessmentButton asChild mode="modal">
        <Button> Create Assessment</Button>
      </CreateAssessmentButton>
      {assessments.map((assessment) => (
          <Link 
            key={assessment.id} 
            href={`assessments/${assessment.id}`}
          >
            <Button>
              {assessment.name}
            </Button>

          </Link>
      ))}
    </div>
  )
}
export default RootPage