import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AssessmentExtended } from "@/types/db";
import { AllContentTabs } from "@/components/books/all-content-tabs";
import { getAssessmentExtended } from "@/actions/books/assessment";

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment: AssessmentExtended | null = await getAssessmentExtended({
    id: Number(params.assessmentId),
  });

  if (!assessment) {
    return notFound();
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <AssessmentSiteHeader />
      <AllContentTabs assessment={assessment} />
    </div>
  );
};

export default AssessmentIdPage;
