"use client";
import { PartExtended } from "@/types/db";
import { ActionButton } from "../action-button";

export function PassageRender({ part }: { part: PartExtended }) {
  const passage = part.passage;
  return (
    <div>
      {passage ? (
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
          {passage.type === "PASSAGE_SIMPLE" && (
            <p className="whitespace-pre-line"> {passage.content} </p>
          )}

          {passage.type === "PASSAGE_MULTI_HEADING" &&
            passage.passageMultiHeadingArray.map((item) => {
              return (
                <div key={item.id}>
                  <p className="font-bold"> {item.title}</p>
                  <p className=" whitespace-pre-line ">{item.content}</p>
                </div>
              );
            })}
        </div>
      ) : (
        <>
          <ActionButton
            actionType="create"
            editType="createPassage"
            data={{ part }}
          />
        </>
      )}
    </div>
  );
}
