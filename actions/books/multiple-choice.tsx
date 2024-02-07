"use server";
import { db } from "@/lib/db";
import { MultipleChoiceExtended } from "@/types/db";
import { create } from "domain";
import { createQuestion } from "./question";
export const createMultipleChoiceArray = async ({
  questionGroupId,
}: {
  questionGroupId: number;
}): Promise<boolean> => {
  try {
    const questionGroup = await db.questionGroup.findUnique({
      where: {
        id: questionGroupId,
      },
      select: {
        questions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!questionGroup) {
      throw new Error("QUestion Group Id not found");
    }
    questionGroup.questions.map(async (question) => {
      await db.multipleChoice.create({
        data: {
          questionGroupId,
          title: "example",
          expectedAnswer: "Option 2",
          questionId: question.id,
          choices: {
            createMany: {
              data: [
                { content: "Option 1", isCorrect: false },
                { content: "Option 2", isCorrect: false },
                { content: "Option 3", isCorrect: false },
                { content: "Option 4", isCorrect: true },
              ],
            },
          },
        },
      });
    });
    return true;
  } catch (error) {
    console.error("Error creating multiple choice array:", error);
    return false;
  }
};

export const updateMultipleChoice = async ({
  title,
  expectedAnswer,
  id,
}: {
  title: string;
  expectedAnswer: string;
  id: number;
}) => {
  try {
    const multipleChoice = await db.multipleChoice.update({
      where: {
        id,
      },
      data: {
        title,
        expectedAnswer,
      },
    });

    return multipleChoice;
  } catch (error) {
    console.error("Error updating multipleChoice:", error);
    return null;
  }
};

export const updateChoice = async ({
  content,
  explanation,
  isCorrect,
  id,
}: {
  content: string;
  explanation?: string;
  isCorrect: boolean;
  id: number;
}) => {
  try {
    const question = await db.choice.update({
      where: {
        id,
      },
      data: {
        content,
        explanation,
        isCorrect,
      },
    });

    return question;
  } catch (error) {
    console.error("Error updating choice:", error);
    return null;
  }
};
