import { PartHeader } from "@/components/books/part-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResizePannelGroup from "@/components/books/resize-pannel-group";
import { AssessmentExtended, PartExtended } from "@/types/db";
interface AssessmentIdPageProps {
  params: {
    assessmentId: string,
    partId: string
  }
}
const PartIdPage = async ({
  params
}: AssessmentIdPageProps) => {
  const assessment: AssessmentExtended | null = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    }, include: {
      parts: {
        where: {
          assessmentId: params.assessmentId
        }, include: {
          passage: true,
          questions: {
            where: {
              partId: params.partId
            }, include: {
              scorableItems: true
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
              <ResizePannelGroup part={part} />
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

export default PartIdPage;
