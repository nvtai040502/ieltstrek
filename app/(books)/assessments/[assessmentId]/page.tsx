import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import ResizePannelGroup from "@/components/books/resize-pannel-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AssessmentExtended } from "@/types/db";
import { PartRender } from "@/components/books/part/part-render";

interface AssessmentIdPageProps {
  params: {
    assessmentId: string
  }
}
const AssessmentIdPage = async ({
  params
}: AssessmentIdPageProps) => {
  
  const assessment: AssessmentExtended | null = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    }, include: {
      parts: { 
        include: {
          passage: true, 
          questions: {
            include: { 
              scorableItems: {
                include: {
                  multipleChoice: {include: {choices: true}},
                  shortAnswer: true
                }
              }
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
      <AssessmentSiteHeader />
      <Tabs defaultValue={assessment.parts[0].id} className="overflow-hidden flex flex-col">
        {assessment.parts.map((part) => (
          <TabsContent key={part.id} value={part.id} className="overflow-hidden flex flex-col m-0">
            <PartRender part={part}/>
            <div className="overflow-y-auto">
              <ResizePannelGroup part={part} />
            </div>
          </TabsContent>
        ))}

        <TabsList className="flex justify-between">
          {assessment.parts.map((part, i) => (
            <TabsTrigger key={part.id} value={part.id} className="w-full">
                {part.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AssessmentIdPage;
