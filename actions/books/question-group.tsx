"use server";

import { db } from "@/lib/db";
import { Passage, QuestionType } from "@prisma/client";

export const createQuestionGroup = async ({
  title,
  description,
  startQuestionNumber,
  type,
  endQuestionNumber,
  partId,
}: {
  title: string;
  description?: string;
  startQuestionNumber: number;
  type: QuestionType;
  endQuestionNumber: number;
  partId: number;
}) => {
  try {
    const questionGroup = await db.questionGroup.create({
      data: {
        title,
        description,
        startQuestionNumber,
        type,
        endQuestionNumber,
        partId,
      },
    });

    return questionGroup;
  } catch (error) {
    console.log("Error creating questionGroup:", error);
    return null;
  }
};

export const updateQuestionGroup = async ({
  title,
  description,
  startQuestionNumber,
  type,
  endQuestionNumber,
  assessmentId,
  id,
}: {
  title: string;
  description?: string;
  startQuestionNumber: number;
  type: QuestionType;
  endQuestionNumber: number;
  id: number;
  assessmentId: number;
}) => {
  try {
    const questionGroup = await db.questionGroup.findUnique({
      where: { id },
      include: { multipleChoiceArray: true },
    });

    if (!questionGroup) {
      return undefined;
    }

    // Check if startQuestionNumber or endQuestionNumber is changed
    if (startQuestionNumber !== questionGroup.startQuestionNumber || endQuestionNumber !== questionGroup.endQuestionNumber) {
      // Find questions within the old range
      const questionsToMove = await db.multipleChoice.findMany({
        where: {
          assessmentId,
          questionNumber: {
            gte: startQuestionNumber,
            lte: endQuestionNumber,
          },
        },
      });
      // Calculate the difference in question numbers
      const questionNumberDifference = startQuestionNumber - questionGroup.startQuestionNumber;
      console.log(questionsToMove)
      console.log("🚀 ~ questionNumberDifference:", questionNumberDifference)

      // for (const questionToMove of questionsToMove) {
      //   // Move to the new range
      //   await db.multipleChoice.update({
      //     where: {
      //       id: questionToMove.id,
      //     },
      //     data: {
      //       questionNumber: questionToMove.questionNumber + questionNumberDifference,
      //     },
      //   });
      // }
    }

    const questionGroupUpdated = await db.questionGroup.update({
      where: {
        id,
      },
      data: {
        title,
        // description,
        // startQuestionNumber,
        // type,
        // endQuestionNumber,
      },
    });

    return questionGroupUpdated;
  } catch (error) {
    console.error("Error updating question:", error);
    return undefined;
  }
};