"use client";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Fragment, useContext, useState } from "react";
import { Dialog, DialogContent, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { UpdateButton } from "../../update-button";
import {
  IdentifyingInformationItemExtended,
  NoteCompletionGroupItemExtended,
} from "@/types/db";
import { cn } from "@/lib/utils";
import { ExamContext } from "@/global/exam-context";
import { IdentifyingInformationAnswer } from "@prisma/client";
import BlankRender from "../../blank-render";
import { UpdateGroupItemForm } from "./group-item-update";

interface GroupItemRenderProps {
  groupItem: NoteCompletionGroupItemExtended;
}

export const GroupItemRender = ({ groupItem }: GroupItemRenderProps) => {
  const [isEditing, setEditing] = useState(false);

  if (!groupItem) {
    return null;
  }

  return (
    <div>
      <Dialog
        open={isEditing}
        onOpenChange={() => setEditing(!isEditing)}
      >
        <DialogContentWithScrollArea>
          <UpdateGroupItemForm
            groupItem={groupItem}
            setIsEditing={setEditing}
          />
        </DialogContentWithScrollArea>
      </Dialog>

      <div>
        <div className="flex gap-2 items-center">
          {groupItem.title && <p className=" font-bold"> {groupItem.title} </p>}
          <UpdateButton setIsUpdating={() => setEditing(true)} />

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
    </div>
  );
};
