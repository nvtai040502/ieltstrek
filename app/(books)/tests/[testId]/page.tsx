import { PassagePannelForm } from "@/components/books/passage-pannel-form";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const TestIdPage = () => {
  return (
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
  );
};

export default TestIdPage;
