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

    const summaryCompletion = await db.summaryCompletion.create({
      data: {
        paragraphWithBlanks,
        questionGroupId,
        summaryCompletionItems: {
          createMany: {
            data: Array.from(
              { length: endQuestionNumber - startQuestionNumber + 1 },
              () => ({
                expectedAnswer: "is",
              })
            ),
          },
        },
      },
      include: {
        summaryCompletionItems: true,
      },
    });

    const questionData = Array.from(
      { length: endQuestionNumber - startQuestionNumber + 1 },
      (_, i) => ({
        partId,
        assessmentId,
        questionNumber: startQuestionNumber + i,
        summaryCompletionId: summaryCompletion.id,
      })
    );

    await db.question.createMany({
      data: questionData,
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
  id,
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
              expectedAnswer,
            },
          })),
        },
      },
    });

    return summaryCompletionUpdated;
  } catch (error) {
    console.log("Error updating summaryCompletion:", error);
    throw error;
  }
};
