"use client"
import Link from "next/link";

import { MultipleChoiceExtended, ScorableItemExtended } from "@/types/db";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UpdateChoiceForm } from "./choice-update-form";
import { Button } from "@/components/ui/button";
import { UpdateScorableItemForm } from "../../scorable-item/update-form";

interface MultipleChoiceRenderProps {
  scorableItems: ScorableItemExtended[]
};
export const MultipleChoiceRender = ({
  scorableItems
}: MultipleChoiceRenderProps) => {
  const [edittingChoices, setEdittingChoices] = useState<{ [key: string]: boolean }>({});
  const [edittingScorableItems, setEdittingScorableItems] = useState<{ [key: string]: boolean }>({});
  return (
    <>
    {scorableItems.map((scorableItem) => {
        const isEdittingScorableItem = edittingScorableItems[scorableItem.id];
        if (scorableItem.multipleChoice === undefined || scorableItem.multipleChoice === null) {
          return null
        }
        return (
          <div  key={scorableItem.id}>
            <Dialog 
              open={isEdittingScorableItem}
              onOpenChange={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: false })} 
            >
              <DialogContent>
                <UpdateScorableItemForm
                  scorableItem={scorableItem} 
                  setIsEditting={
                    () => setEdittingScorableItems({ 
                      ...edittingScorableItems, 
                      [scorableItem.id]: false 
                      })}
                />
              </DialogContent>
            </Dialog>
            <div className="space-y-2">
                <p>{scorableItem.content}</p>
                  <Button onClick={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: true })}>Update</Button>
                  <RadioGroup>
                      {scorableItem.multipleChoice.choices.map((choice) => {
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
            </div>
            </div>
        )
      })
    }
    
    </>
    
  );
};