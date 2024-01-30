"use server"

import { db } from "@/lib/db";
import { ScorableItemExtended } from "@/types/db";
import { MultipleChoice, Passage, QuestionType, ShortAnswer} from "@prisma/client";
export const createScorableItems = async ({
  questionId,
  questionType,
  amountScorableItemNeedToCreate,
}: {
  questionId: string;
  questionType: QuestionType;
  amountScorableItemNeedToCreate: number;
}): Promise<boolean> => {
  try {
    Array.from( {length: amountScorableItemNeedToCreate }).map(async () => (
      await createScorableItem({questionId: questionId, questionType: questionType})
    ))
    return true
  } catch (error) {
    console.error("Error creating scorableItem:", error);
    return false;
  }
};

export const createScorableItem = async ({
  questionId,
  questionType
}: {
  questionId: string;
  questionType: QuestionType;
}): Promise<ScorableItemExtended | null> => {
  try {
    if (questionType === "MULTIPLE_CHOICE") {
      const scorableItem: ScorableItemExtended = await db.scorableItem.create({
        data: {
          questionId,
          multipleChoice: {
            create: {
              title: "example",
              choices: {
                createMany: {
                  data: [
                    { content: "Option 1", isCorrect: false },
                    { content: "Option 2", isCorrect: true },
                    { content: "Option 3", isCorrect: true },
                    { content: "Option 4", isCorrect: true }
                  ]
                }
              }
            }
          }
        },
        include: { multipleChoice: { include: { choices: true } } }
      }) 

      return scorableItem;
    } else if (questionType === "SHORT_ANSWER") {
      const scorableItem: ScorableItemExtended = await db.scorableItem.create({
        data: {
          questionId,
          shortAnswer: {
            create: {
              sentence: "Hello, What you name and how old are you?",
              blank: "What"
            }
          }
        },
        include: { shortAnswer: true }
      })
      return scorableItem;
      
    }

    return null; // If questionType is not recognized
  } catch (error) {
    console.error("Error creating scorableItem:", error);
    return null;
  }
};


