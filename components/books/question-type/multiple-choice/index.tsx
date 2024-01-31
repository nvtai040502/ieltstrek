"use client"
import Link from "next/link";

import { MultipleChoiceExtended, QuestionExtended } from "@/types/db";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UpdateChoiceForm } from "./choice/choice-update-form";
import { Button } from "@/components/ui/button";
import { UpdateMultipleChoiceForm } from "./update-form";
import { UpdateButton } from "../../update-button";

interface MultipleChoiceRenderProps {
  questions: QuestionExtended[]
};
export const MultipleChoiceRender = ({
  questions
}: MultipleChoiceRenderProps) => {
  const [edittingChoices, setEdittingChoices] = useState<{ [key: string]: boolean }>({});
  const [edittingQuestions, setEdittingQuestions] = useState<{ [key: string]: boolean }>({});
  return (
    <>
    {questions.map((question) => {
        const isEdittingQuestion = edittingQuestions[question.id];
        if (question.multipleChoice === undefined || question.multipleChoice === null) {
          return null
        }
        return (
          <div  key={question.id}>
            <Dialog 
              open={isEdittingQuestion}
              onOpenChange={() => setEdittingQuestions({ ...edittingQuestions, [question.id]: false })} 
            >
              <DialogContent>
                <UpdateMultipleChoiceForm
                  multipleChoice={question.multipleChoice} 
                  setIsEditting={
                    () => setEdittingQuestions({ 
                      ...edittingQuestions, 
                      [question.id]: false 
                      })}
                />
              </DialogContent>
            </Dialog>
            <div className="space-y-2">
                <div className="flex items-center">
                  <p>{question.multipleChoice.title}</p>
                  <UpdateButton setIsUpdating={() => setEdittingQuestions({ [question.id]: true })}/>

                </div>
                  <RadioGroup>
                      {question.multipleChoice.choices.map((choice) => {
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
                              <UpdateButton setIsUpdating={() => setEdittingChoices({ [choice.id]: true })}/>
                            </div>
                            

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