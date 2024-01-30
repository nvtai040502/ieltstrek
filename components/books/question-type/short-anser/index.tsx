"use client"
import Link from "next/link";

import { ScorableItemExtended } from "@/types/db";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateShortAnswerForm } from "./update-form";
import { Input } from "@/components/ui/input";

interface ShortAnswerRenderProps {
  scorableItems: ScorableItemExtended[]
};
export const ShortAnswerRender = ({
  scorableItems
}: ShortAnswerRenderProps) => {
  const [edittingScorableItems, setEdittingScorableItems] = useState<{ [key: string]: boolean }>({});
  return (
    <div className="flex gap-2 flex-wrap">
    {scorableItems.map((scorableItem) => {
        const isEdittingScorableItem = edittingScorableItems[scorableItem.id];
        if (scorableItem.shortAnswer === undefined || scorableItem.shortAnswer === null) {
          return null
        }
        return (
          <div  key={scorableItem.id}>
            <Dialog 
              open={isEdittingScorableItem}
              onOpenChange={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: false })} 
            >
              <DialogContent>
                <UpdateShortAnswerForm
                  scorableItem={scorableItem} 
                  setIsEditting={
                    () => setEdittingScorableItems({ 
                      ...edittingScorableItems, 
                      [scorableItem.id]: false 
                      })}
                />
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-2">
                <p>{scorableItem.content}</p>
                <Input className=" border-foreground "/>
                <Button onClick={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: true })}>Update</Button>
                {/* <p>{scorableItem.shortAnswer.correctAnswer}</p> */}
                  {/* <Button onClick={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: true })}>Update</Button>
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
                  </RadioGroup> */}
            </div>
            </div>
        )
      })
    }
    
    </div>
    
  );
};