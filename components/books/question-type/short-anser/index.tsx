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
      const sentence = scorableItem.shortAnswer.sentence
      
        return (
          <div  key={scorableItem.id}>
            <Dialog 
              open={isEdittingScorableItem}
              onOpenChange={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: false })} 
            >
              <DialogContent>
                <UpdateShortAnswerForm
                  shortAnswer={scorableItem.shortAnswer} 
                  setIsEditting={
                    () => setEdittingScorableItems({ 
                      ...edittingScorableItems, 
                      [scorableItem.id]: false 
                      })}
                />
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-1">
                {sentence.split(" ").map((word,i) => (
                  <div key={i}>
                    {word==="___" ? (<Input className=" border-foreground" />): (<p>{word}</p>)}

                  </div>
                ))}
                <Button onClick={() => setEdittingScorableItems({ ...edittingScorableItems, [scorableItem.id]: true })}>Update</Button>
                
            </div>
            </div>
        )
      })
    }
    
    </div>
    
  );
};