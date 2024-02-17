import { PassageExtended } from '@/types/test-exam';
import { ActionButton } from '../test-exam/action-button';

export function PassageRender({ passage }: { passage: PassageExtended }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <p className=" font-bold"> {passage.title} </p>
          <p className=" italic font-light">{passage.description}</p>
        </div>
        <ActionButton
          actionType="update"
          editType="editPassage"
          data={{ passage }}
        />
      </div>
      {passage.type === 'PASSAGE_SIMPLE' && (
        <p className="whitespace-pre-line"> {passage.content} </p>
      )}

      {passage.type === 'PASSAGE_MULTI_HEADING' &&
        passage.passageHeadingList.map((passageHeading) => {
          return (
            <div key={passageHeading.id}>
              <div className="flex justify-between">
                <p className="font-bold"> {passageHeading.title}</p>
                <ActionButton
                  actionType="update"
                  editType="editPassageMultiHeading"
                  data={{ passageHeading }}
                />
              </div>
              <p className=" whitespace-pre-line ">{passageHeading.content}</p>
            </div>
          );
        })}
    </div>
  );
}
