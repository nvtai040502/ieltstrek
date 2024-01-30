"use server"

import { db } from "@/lib/db";
import { Passage, QuestionType} from "@prisma/client";

export const createQuestionGroup = async ({
  title,
  description,
  startQuestionNumber,
  type,
  endQuestionNumber,
  titleForQuestions,
  partId
}: {
  title: string,
  description?: string,
  startQuestionNumber: number,
  type: QuestionType,
  endQuestionNumber: number,
  titleForQuestions?: string
  partId: string
}) => {
  try {
    const questionGroup = await db.questionGroup.create({
      data: {
        title,
        description,
        startQuestionNumber,
        type,
        endQuestionNumber,
        titleForQuestions,
        partId
      },
    });

    return questionGroup;
  } catch (error) {
    console.error("Error creating questionGroup:", error);
    return null;
  }
};

export const updateQuestionGroup = async ({
  title,
  description,
  startQuestionNumber,
  type,
  endQuestionNumber,
  titleForQuestions,
  id
}: {
  title: string,
  description?: string,
  startQuestionNumber: number,
  type: QuestionType,
  endQuestionNumber: number,
  titleForQuestions?: string
  id: string
}) => {
  try {
    const questionGroup = await db.questionGroup.update({
      where: {
        id
      },
      data: {
        title,
        description,
        startQuestionNumber,
        type,
        endQuestionNumber,
        titleForQuestions,
      },
    });

    return questionGroup;
  } catch (error) {
    console.error("Error updating question:", error);
    return null;
  }
};
