import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AssessmentExtended } from "@/types/db";
import { TextExamHeaderRender } from "@/components/test-exam/render/header";
import { TabContentRender } from "@/components/test-exam/render/tab-content";

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId,
    },
    include: {
      parts: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (!assessment) {
    return notFound();
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <TextExamHeaderRender />
      <TabContentRender assessment={assessment} />
    </div>
  );
};

export default AssessmentIdPage;
