"use client";
import { Fragment, useContext, useState } from "react";
import { UpdateButton } from "../../update-button";
import {
  NoteCompletionGroupItemExtended,
} from "@/types/db";
import { cn } from "@/lib/utils";
import BlankRender from "../../blank-render";
import { useEditHook } from "@/global/use-edit-hook";

interface GroupItemRenderProps {
  groupItem: NoteCompletionGroupItemExtended;
}

export const GroupItemRender = ({
  groupItem,
}: GroupItemRenderProps) => {
  const { onOpen } = useEditHook();
  if (!groupItem) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        {groupItem.title && <p className=" font-bold"> {groupItem.title} </p>}
        <UpdateButton
          setIsUpdating={() =>
            onOpen({
              type: "editNoteCompletionGroupItem",
              data: { noteCompletionGroupItem: groupItem },
            })
          }
        />
      </div>
      {groupItem.noteCompletionItems.map((item) => (
        <div key={item.id} className="py-4 px-8 flex items-center">
          {item.sentence.split(" ").map((word, index) => (
            <Fragment key={index}>
              {word === "___" ? (
                <BlankRender
                  key={index}
                  questionNumber={item.blank!.question.questionNumber}
                />
              ) : (
                <span>{word}</span>
              )}
              {index < item.sentence.split(" ").length - 1 && (
                <span>&nbsp;</span>
              )}{" "}
              {/* Add space between words */}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
