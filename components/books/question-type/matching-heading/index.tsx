"use client";

import { MatchingHeadingExtended } from "@/types/db";

interface MatchingHeadingRenderProps {
  matchingHeading?: MatchingHeadingExtended | null;
}
export const MatchingHeadingRender = ({
  matchingHeading,
}: MatchingHeadingRenderProps) => {
  if (!matchingHeading) {
    return null;
  }

  return (
    <>
      {/* <ActionButton
        actionType="update"
        editType="editNoteCompletion"
        data={{ noteCompletion }}
      /> */}
      {matchingHeading.matchingHeadingItemArray.map((item) => {
        console.log(item);
        return (
          <div key={item.id}>
            <p>{item.content}</p>
          </div>
        );
      })}
    </>
  );
};
