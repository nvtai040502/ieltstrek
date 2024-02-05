"use server";

import { db } from "@/lib/db";

export const createQuestion = async ({
  partId,
  questionNumber,
}: {
  questionNumber: number;
  partId: number;
}) => {
  try {
    const part = await db.part.findUnique({
      where: {
        id: partId,
      },
      select: {
        assessmentId: true,
      },
    });
    if (!part) {
      throw new Error("");
    }
    const question = await db.question.create({
      data: {
        partId,
        assessmentId: part.assessmentId,
        questionNumber,
      },
    });

    return question;
  } catch (error) {
    console.error("Error creating question:", error);
    return undefined;
  }
};
