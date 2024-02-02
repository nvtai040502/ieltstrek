"use server"

import { db } from "@/lib/db";

export const createQuestion = async ({
  partId,
  assessmentId,
  questionNumber
}: {
  questionNumber: number;
  assessmentId: number;
  partId: number;
}) => {
  try {
    const question = await db.question.create({
      data: {
        partId,
        assessmentId,
        questionNumber
      }
    })
    
    return question
  } catch (error) {
    console.error("Error creating questionGroup:", error);
    return undefined
  }
};