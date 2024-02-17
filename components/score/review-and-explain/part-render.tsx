import { Suspense } from 'react';
import { Part } from '@prisma/client';
import {
  CustomResizablePanel,
  ResizableHandle,
  ResizablePanelGroup
} from '../../ui/resizable';
import ButtonNavigatePart from './button-nav-part';
import { PassageRender } from './passage-render';
import QuestionGroupRender from './question-group-render';

const PartRender = async ({
  part,
  totalParts
}: {
  part: Part;
  totalParts: number;
}) => {
  const nextPartIndex =
    part.order < totalParts - 1 ? part.order + 1 : undefined;
  const prevPartIndex = part.order > 0 ? part.order - 1 : undefined;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg flex-grow"
    >
      <CustomResizablePanel>
        <p>{part.title}</p>
        <Suspense fallback={<></>}>
          <QuestionGroupRender partId={part.id} />
        </Suspense>
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
        <Suspense fallback={<></>}>
          <PassageRender partId={part.id} />
        </Suspense>
      </CustomResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PartRender;
