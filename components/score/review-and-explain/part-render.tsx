import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  CustomResizablePanel,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '../../ui/resizable';
import ButtonNavigatePart from './button-nav-part';

const PartRender = async ({
  partId,
  totalParts
}: {
  partId: string;
  totalParts: number;
}) => {
  const part = await db.part.findUnique({
    where: { id: partId },
    include: { passage: true }
  });
  if (!part || !part.passage) {
    return null;
  }
  const nextPartIndex =
    part.order < totalParts - 2 ? part.order + 1 : undefined;
  const prevPartIndex = part.order > 0 ? part.order - 1 : undefined;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg flex-grow"
    >
      <CustomResizablePanel>
        <p className="p-40">{part.title}</p>
        <p className="p-40">{part.title}</p>
        <p className="p-40">{part.title}</p>
        <p>{part.description}</p>
        <div className="absolute bottom-0 left-0 bg-secondary w-full py-2 px-4">
          <div className="flex items-center justify-between">
            <p>{part.title}</p>
            <ButtonNavigatePart
              prevPartIndex={prevPartIndex}
              nextPartIndex={nextPartIndex}
            />
          </div>
        </div>
      </CustomResizablePanel>

      <ResizableHandle withHandle />
      <CustomResizablePanel>
        <p>{part.passage.title}</p>
      </CustomResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PartRender;
