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
        include: {choices: true}
      });
      await db.multipleChoiceExpectedAnswer.create({
        data: {
          choiceId: multipleChoice.choices[1].id,
          multipleChoiceId: multipleChoice.id
        }
      })
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
      },
    });
    const expectedAnswerRecord = await db.multipleChoiceExpectedAnswer.findFirst({
      where: {
        multipleChoiceId: multipleChoice.id,
      },
    });
    
    if (expectedAnswerRecord) {
      await db.multipleChoiceExpectedAnswer.update({
        where: {
          id: expectedAnswerRecord.id,
        },
        data: {
          choiceId: Number(expectedAnswer),
        },
      });
    }
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
