"use server";

import { db } from "@/lib/db";

export const createQuestion = async ({
  questionGroupId,
  questionNumber,
}: {
  questionNumber: number;
  questionGroupId: number;
}) => {
  try {
    const questionGroup = await db.questionGroup.findUnique({
      where: {
        id: questionGroupId,
      },
      include: {
        part: {
          select: {
            assessmentId: true
          }
        }
      }
    });
    if (!questionGroup) {
      throw new Error("QuestionGroup Id not found");
    }
    const question = await db.question.create({
      data: {
        partId: questionGroup.partId,
        assessmentId: questionGroup.part.assessmentId,
        questionNumber,
        questionGroupId: questionGroup.id
      },
    });

    return question;
  } catch (error) {
    console.error("Error creating question:", error);
    return undefined;
  }
};
