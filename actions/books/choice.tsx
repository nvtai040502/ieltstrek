"use server"
import { db } from "@/lib/db";

export const updateChoice = async ({
  content,
  explanation,
  isCorrect,
  id
}: {
  content: string
  explanation?: string,
  isCorrect: boolean,
  id: string
}) => {
  try {
    const question = await db.choice.update({
      where: {
        id
      },
      data: {
        content,
        explanation,
        isCorrect
      },
    });

    return question;
  } catch (error) {
    console.error("Error updating choice:", error);
    return null;
  }
};
