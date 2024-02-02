"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";

export const createSummaryCompletion = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  partId,
  assessmentId,
}: {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
  partId: number;
  assessmentId: number;
}) => {
  try {
    const sentence = "Hello, this ___ a website simulate ielts test exam?";
    const paragraphWithBlanks = Array.from(
      { length: endQuestionNumber - startQuestionNumber + 1 },
      () => sentence
    ).toString();

    const questions = await Promise.all(
      Array.from({ length: endQuestionNumber - startQuestionNumber + 1 }, async (_, i) => {
        const question = await createQuestion({
          partId,
          assessmentId,
          questionNumber: startQuestionNumber + i,
        });

        if (!question) {
          throw new Error("Error creating question");
        }

        return question;
      })
    );

    const summaryCompletion = await db.summaryCompletion.create({
      data: {
        paragraphWithBlanks,
        questionGroupId,
        summaryCompletionItems: {
          createMany: {
            data: questions.map((question) => ({
              expectedAnswer: "is",
              questionId: question.id,
            })),
          },
        },
      },
      include: {
        summaryCompletionItems: true,
      },
    });

    return true;
  } catch (error) {
    console.log("Error creating summaryCompletion:", error);
    return false;
  }
};

export const updateSummaryCompletionItem = async ({
  expectedAnswer,
  id,
}: {
  expectedAnswer: string;
  id: number;
}) => {
  try {
    const summaryCompletionUpdated = await db.summaryCompletionItem.update({
      where: { id },
      data: {
        expectedAnswer
      }
    });

    return summaryCompletionUpdated;
  } catch (error) {
    console.log("Error updating summaryCompletion:", error);
    throw error;
  }
};
