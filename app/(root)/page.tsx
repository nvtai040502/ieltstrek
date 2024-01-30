import { CreateAssessmentButton } from "@/components/books/assessment/create-assessment-button"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import { Button } from "@/components/ui/button"
const RootPage = async () => {
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
    </div>
  )
}
export default RootPage