"use server"

import { db } from "@/lib/db";
import { Passage, QuestionType} from "@prisma/client";

export const createQuestionGroup = async ({
  title,
  description,
  startQuestionNumber,
  type,
  endQuestionNumber,
  partId
}: {
  title: string,
  description?: string,
  startQuestionNumber: number,
  type: QuestionType,
  endQuestionNumber: number,
  partId: number
}) => {
  try {
    const questionGroup = await db.questionGroup.create({
      data: {
        title,
        description,
        startQuestionNumber,
        type,
        endQuestionNumber,
        partId
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
  id
}: {
  title: string,
  description?: string,
  startQuestionNumber: number,
  type: QuestionType,
  endQuestionNumber: number,
  id: number
}) => {
  try {
    const multipleChoice = await db.multipleChoice.findUnique({
      where: {
        UniqueQuestionNumberInGroup: {
          questionNumber: 3,
          questionGroupId: id,
        }
      }
    })
    

    // const questionGroupUpdated = await db.questionGroup.update({
    //   where: {
    //     id
    //   },
    //   data: {
    //     title,
    //     description,
    //     startQuestionNumber,
    //     type,
    //     endQuestionNumber,
    //   },
    // });
    return multipleChoice;
  } catch (error) {
    console.error("Error updating question:", error);
    return null;
  }
};
