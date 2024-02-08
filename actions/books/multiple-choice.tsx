"use server";
import { db } from "@/lib/db";
import { MultiOneExtended } from "@/types/db";
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
          expectedAnswer: "Option 1",
          questionId: question.id,
          choices: {
            createMany: {
              data: [
                { content: "Option 1" },
                { content: "Option 2" },
                { content: "Option 3" },
                { content: "Option 4" },
              ],
            },
          },
        },
        include: { choices: true },
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
      },
    });

    return question;
  } catch (error) {
    console.error("Error updating choice:", error);
    return null;
  }
};
