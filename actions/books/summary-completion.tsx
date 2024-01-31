"use server";
import { db } from "@/lib/db";

export const createSummaryCompletion = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber
}: {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
}): Promise<boolean> => {
  try {
    const summaryCompletionItems = [];

    for (let i = startQuestionNumber; i <= endQuestionNumber; i++) {
      summaryCompletionItems.push({
        questionNumber: i,
        expectedAnswer: "hello"
      });
    }

    const summaryCompletion = await db.summaryCompletion.create({
      data: {
        paragraphWithBlanks: "May be ___ hello, what ___ your ___name. I am a student and want ___ to learn more.",
        questionGroupId,
        summaryCompletionItems: {
          createMany: {
            data: summaryCompletionItems
          }
        }
      }
    });
    return true;
  } catch (error) {
    console.log("Error creating summaryCompletion:", error);
    return false;
  }
};
export const updateSummaryCompletion = async ({
  paragraphWithBlanks,
  expectedAnswers,
  id
}: {
  paragraphWithBlanks: string;
  expectedAnswers: string[];
  id: number;
}) => {
  try {
    const summaryCompletionUpdated = await db.summaryCompletion.update({
      where: { id },
      data: {
        paragraphWithBlanks,
        summaryCompletionItems: {
          updateMany: expectedAnswers.map((expectedAnswer, index) => ({
            where: { questionNumber: index + 1, summaryCompletionId: id },
            data: {
              expectedAnswer
            }
          }))
        }
      }
    });

    return summaryCompletionUpdated; 

  } catch (error) {
    console.log("Error updating summaryCompletion:", error);
    throw error; 
  }
};

