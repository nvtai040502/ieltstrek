"use server";
import { db } from "@/lib/db";
import { MultipleChoiceExtended } from "@/types/db";

export const createMultipleChoiceArray = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  assessmentId,
  partId,
}: {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
  assessmentId: number;
  partId: number;
}): Promise<boolean> => {
  try {
    for (let i = startQuestionNumber; i <= endQuestionNumber; i++) {
      await createMultipleChoice({
        assessmentId,
        questionGroupId,
        questionNumber: i,
        partId
      });
    }
    return true;
  } catch (error) {
    console.error("Error creating multipleChoicearray:", error);
    return false;
  }
};

export const createMultipleChoice = async ({
  questionGroupId,
  questionNumber,
  assessmentId,
  partId,
}: {
  questionGroupId: number;
  questionNumber: number;
  assessmentId: number;
  partId: number;
}): Promise<MultipleChoiceExtended | null> => {
  try {
    const multipleChoice: MultipleChoiceExtended =
      await db.multipleChoice.create({
        data: {
          partId,
          questionNumber,
          assessmentId,
          questionGroupId,
          title: "example",
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
        include: { choices: true },
      });

    return multipleChoice;
  } catch (error) {
    console.error("Error creating multipleChoice:", error);
    return null;
  }
};
export const updateMultipleChoice = async ({
  title,
  id,
}: {
  title: string;
  id: number;
}) => {
  try {
    const multipleChoice = await db.multipleChoice.update({
      where: {
        id,
      },
      data: {
        title,
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
