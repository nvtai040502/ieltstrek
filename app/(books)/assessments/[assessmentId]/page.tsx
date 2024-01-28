import { AssessmentContentHeader } from "@/components/books/assessment-content-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import PartsNavigator from "@/components/books/parts-nav";
import QuestionPalette from "@/components/books/question-palette";
import ResizePannelGroup from "@/components/books/resize-pannel-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
interface AssessmentIdPageProps {
  params: {
    assessmentId: string
  }
}
const AssessmentIdPage = async ({
  params
}: AssessmentIdPageProps) => {
  const parts = await db.part.findMany({
    where: {
      assessmentId: params.assessmentId
    }
  })
  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    }
  })

  if (!assessment) {
    return notFound()
  }

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <AssessmentSiteHeader />
      <Tabs defaultValue={parts[0].id} className="overflow-hidden flex flex-col">
        {parts.map((part) => (
          <TabsContent key={part.id} value={part.id} className="overflow-hidden flex flex-col m-0">
            {/* The following components are not changed when switching tabs */}
            <AssessmentContentHeader />
            <div className=" overflow-y-auto">
              <ResizePannelGroup />
            </div>
          </TabsContent>
        ))}

        {/* TabsList remains outside the mapping to avoid multiple instances */}
        <TabsList className="flex justify-between">
          {parts.map((part, i) => (
            <TabsTrigger key={part.id} value={part.id} className="w-full">
                Part 1
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AssessmentIdPage;
