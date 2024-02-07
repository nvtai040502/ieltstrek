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
      const multipleChoice = await db.multipleChoice.create({
        data: {
          questionGroupId,
          title: "example",
          questionId: question.id,
          choices: {
            create: [
              { content: "Option 1" },
              { content: "Option 2" },
              { content: "Option 3" },
              { content: "Option 4" },
            ],
          },
        },
        include: { choices: true },
      });
      await db.multipleChoiceExpectedAnswer.createMany({
        data: [
          {
            choiceId: multipleChoice.choices[1].id,
            multipleChoiceId: multipleChoice.id,
          },
          {
            choiceId: multipleChoice.choices[2].id,
            multipleChoiceId: multipleChoice.id,
          },
        ],
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
  choiceIdArray,
  id,
}: {
  title: string;
  choiceIdArray: number[];
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

    await db.multipleChoiceExpectedAnswer.updateMany({
      where: {
        multipleChoiceId: multipleChoice.id,
      },
      data: choiceIdArray.map((choiceId) => {
        choiceId;
      }),
    });
    return multipleChoice;
  } catch (error) {
    console.error("Error updating multipleChoice:", error);
    return null;
  }
};
