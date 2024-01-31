"use server"

import { db } from "@/lib/db";
import { QuestionExtended } from "@/types/db";
import { QuestionType } from "@prisma/client";
export const createQuestions = async ({
  questionGroupId,
  questionType,
  startQuestionNumber,
  endQuestionNumber
}: {
  questionGroupId: string;
  questionType: QuestionType;
  startQuestionNumber: number;
  endQuestionNumber: number
}): Promise<boolean> => {
  try {
    for (let i = startQuestionNumber; i <= endQuestionNumber; i++) {
      await createQuestion({ questionGroupId, questionType, questionNumber: i });
    }
    
    return true
  } catch (error) {
    console.error("Error creating questions:", error);
    return false;
  }
};

export const createQuestion = async ({
  questionGroupId,
  questionNumber,
  questionType
}: {
  questionGroupId: string;
  questionNumber: number
  questionType: QuestionType;
}): Promise<QuestionExtended | null> => {
  try {
    if (questionType === "MULTIPLE_CHOICE") {
      const question: QuestionExtended = await db.question.create({
        data: {
          questionNumber,
          questionGroupId,
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

      return question;
    } else if (questionType === "SHORT_ANSWER") {
      const question: QuestionExtended = await db.question.create({
        data: {
          questionNumber,
          questionGroupId,
          shortAnswer: {
            create: {
              sentence: "Hello, What you name and how old are you?",
              blank: "What"
            }
          }
        },
        include: { shortAnswer: true }
      })
      return question;
      
    }

    return null; // If questionType is not recognized
  } catch (error) {
    console.error("Error creating question:", error);
    return null;
  }
};


