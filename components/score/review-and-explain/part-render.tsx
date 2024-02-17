import { db } from '@/lib/db';
import { PassageRender } from '@/components/common/passage-render';
import {
  CustomResizablePanel,
  ResizableHandle,
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
    include: {
      passage: {
        include: { passageHeadingList: { orderBy: { order: 'asc' } } }
      }
    }
  });
  if (!part || !part.passage) {
    return null;
  }
  const nextPartIndex =
    part.order < totalParts - 1 ? part.order + 1 : undefined;
  const prevPartIndex = part.order > 0 ? part.order - 1 : undefined;
  console.log(part.order, totalParts);
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
        <PassageRender passage={part.passage} />
      </CustomResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PartRender;
