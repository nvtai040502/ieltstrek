import { PartHeader } from "@/components/books/part-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import { PassagePannelForm } from "@/components/books/passage-pannel-form";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
  console.log(parts)

  return (
    <div className="max-h-screen h-screen flex flex-col bg-red-500">
      <AssessmentSiteHeader />
      <PartHeader />
      <div className="flex-grow overflow-y-auto">
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg flex-grow">
        <ResizablePanel defaultSize={50} className="overflow-auto h-full">
          <ScrollArea type="always" className="w-full h-full overflow-auto pl-4 pr-8">
          <PassagePannelForm sectionId="test"/>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
            
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
        <ScrollArea type="always" className="w-full h-full overflow-auto">
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
          <div className="flex h-full items-center justify-center p-40">
            <span className="font-semibold">Content</span>
          </div>
            <ScrollBar className="w-4" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    </div>
    </div>
  );
};

export default AssessmentIdPage;
