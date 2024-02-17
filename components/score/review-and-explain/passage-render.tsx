import { db } from '@/lib/db';

export async function PassageRender({ partId }: { partId: string }) {
  const passage = await db.passage.findUnique({
    where: { partId },
    include: { passageHeadingList: { orderBy: { order: 'asc' } } }
  });
  if (!passage) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" font-bold"> {passage.title} </p>
        <p className=" italic font-light">{passage.description}</p>
      </div>

      {passage.type === 'PASSAGE_SIMPLE' && (
        <p className="whitespace-pre-line"> {passage.content} </p>
      )}

      {passage.type === 'PASSAGE_MULTI_HEADING' &&
        passage.passageHeadingList.map((passageHeading) => {
          return (
            <div key={passageHeading.id}>
              <p className="font-bold"> {passageHeading.title}</p>
              <p className=" whitespace-pre-line ">{passageHeading.content}</p>
            </div>
          );
        })}
    </div>
  );
}
