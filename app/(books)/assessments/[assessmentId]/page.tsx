import { PartHeader } from "@/components/books/part-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
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
  
  
  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    }, include: {
      parts: {
        where: {
          assessmentId: params.assessmentId
        }, include: {
          passage: {
            where: {
              partId: this.parts.id
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
            {/* The following components are not changed when switching tabs */}
            <PartHeader part={part}/>
            
            {/* <PartHeaderForm part={part}/> */}
            <div className=" overflow-y-auto">
              <ResizePannelGroup part={part}/>
            </div>
          </TabsContent>
        ))}

        {/* TabsList remains outside the mapping to avoid multiple instances */}
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
