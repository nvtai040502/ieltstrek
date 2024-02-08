"use server";
import { db } from "@/lib/db";
import { MultipleChoiceExtended } from "@/types/db";
import { create } from "domain";
import { createQuestion } from "./question";
export const createMultiMoreArray = async ({
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
      await db.multipleChoiceMoreAnswers.create({
        data: {
          questionGroupId,
          title: "example",
          questionId: question.id,
          expectedAnswers: ["Option 1", "Option 2"],
          choices: {
            create: [
              { content: "Option 1" },
              { content: "Option 2" },
              { content: "Option 3" },
              { content: "Option 4" },
            ],
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

export const updateMultiMore = async ({
  title,
  expectedAnswers,
  id,
}: {
  title: string;
  expectedAnswers: string[];
  id: number;
}) => {
  try {
    const multiMoreAnswers = await db.multipleChoiceMoreAnswers.update({
      where: {
        id,
      },
      data: {
        title,
        expectedAnswers,
      },
    });

    return multiMoreAnswers;
  } catch (error) {
    console.error("Error updating multipleChoice:", error);
    return null;
  }
};
