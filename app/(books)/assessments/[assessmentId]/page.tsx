import { PartHeader } from "@/components/books/part-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import ResizePannelGroup from "@/components/books/resize-pannel-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ChangePartForm } from "@/components/books/change-part-form";
import { ChangePartButton } from "@/components/books/change-part-button";
import { Button } from "@/components/ui/button";
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
    }, orderBy: {
      createdAt: "desc"
    }
  })
  console.log("🚀 ~ parts:", parts)
  
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
            <PartHeader part={part}/>
            
            {/* <PartHeaderForm part={part}/> */}
            <div className=" overflow-y-auto">
              <ResizePannelGroup />
            </div>
          </TabsContent>
        ))}

        {/* TabsList remains outside the mapping to avoid multiple instances */}
        <TabsList className="flex justify-between">
          {parts.map((part, i) => (
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
