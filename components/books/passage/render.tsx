"use client";
import { PartExtended } from "@/types/db";
import { ActionButton } from "../action-button";

export function PassageRender({ part }: { part: PartExtended }) {
  return (
    <div>
      {part.passage ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <p className=" font-bold"> {part.passage.title} </p>
              <p className=" italic font-light">{part.passage.description}</p>
            </div>
            <ActionButton
              actionType="update"
              editType="editPassage"
              data={{ passage: part.passage }}
            />
          </div>
          <p className="whitespace-pre-line"> {part.passage.content} </p>
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
