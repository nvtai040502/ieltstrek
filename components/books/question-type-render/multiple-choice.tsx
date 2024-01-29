"use client"
import Link from "next/link";

import { MultipleChoiceExtended } from "@/types/db";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UpdateChoiceForm } from "../multiple-choice/choice-update-form";
import { Button } from "@/components/ui/button";

interface MultipleChoiceRenderProps {
  multipleChoice: MultipleChoiceExtended
};

export const MultipleChoiceRender = ({
  multipleChoice
}: MultipleChoiceRenderProps) => {
  const [edittingChoices, setEdittingChoices] = useState<{ [key: string]: boolean }>({});
  return (
    <RadioGroup>
        {multipleChoice.choices.map((choice) => {
          const isEdittingChoice = edittingChoices[choice.id]
          return (
            <div key={choice.id}>
              <Dialog 
                  open={isEdittingChoice}
                  onOpenChange={() => setEdittingChoices({ ...edittingChoices, [choice.id]: false })} 
                >
                  <DialogContent>
                    <UpdateChoiceForm choice={choice} setIsEditting={() => setEdittingChoices({ ...edittingChoices, [choice.id]: false })}/>
                  </DialogContent>
                </Dialog>
              <div className="flex items-center space-x-2 w-full hover:bg-secondary" key={choice.id}>
                <RadioGroupItem value={choice.content} id={choice.id} />
                <Label htmlFor={choice.id} className="py-4 w-full cursor-pointer">{choice.content}</Label>
              </div>
              <Button onClick={() => setEdittingChoices({ ...edittingChoices, [choice.id]: true })}>Update</Button>

            </div>
          )
        })}
    </RadioGroup>
    
  );
};