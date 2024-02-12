import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AssessmentExtended } from "@/types/db";
import { TabRender } from "@/components/books/tab-render";

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment = await db.assessment.findUnique({
    where: {
      id: Number(params.assessmentId),
    },
  });
  if (!assessment) {
    return notFound();
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <AssessmentSiteHeader />
      {/* <TabRender assessment={assessment} /> */}
    </div>
  );
};

export default AssessmentIdPage;
