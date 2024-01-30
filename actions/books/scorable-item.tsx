"use server"

import { db } from "@/lib/db";
import { ScorableItemExtended } from "@/types/db";
import { MultipleChoice, Passage, QuestionType, ShortAnswer} from "@prisma/client";
export const createScorableItems = async ({
  content,
  questionId,
  questionType,
  amountScorableItemNeedToCreate,
}: {
  content: string;
  questionId: string;
  questionType: QuestionType;
  amountScorableItemNeedToCreate: number;
}): Promise<boolean> => {
  try {
    Array.from( {length: amountScorableItemNeedToCreate }).map(async () => (
      await createScorableItem({content: content, questionId: questionId, questionType: questionType})
    ))
    return true
  } catch (error) {
    console.error("Error creating scorableItem:", error);
    return false;
  }
};

export const createScorableItem = async ({
  content,
  questionId,
  questionType
}: {
  content: string;
  questionId: string;
  questionType: QuestionType;
}): Promise<ScorableItemExtended | null> => {
  try {
    if (questionType === "MULTIPLE_CHOICE") {
      const scorableItem: ScorableItemExtended = await db.scorableItem.create({
        data: {
          content,
          questionId,
          multipleChoice: {
            create: {
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
          content,
          questionId,
          shortAnswer: {
            create: {
              correctAnswer: "example"
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


export const updateScorableItem = async ({
  content,
  id,
}: {
  content?: string
  id: string
}) => {
  try {
    const scorableItem = await db.scorableItem.update({
      where: {
        id
      },
      data: {
        content
        
      },
    });

    return scorableItem;
  } catch (error) {
    console.error("Error updating scorableItem:", error);
    return null;
  }
};
