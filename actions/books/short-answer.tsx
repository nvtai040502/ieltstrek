"use server"
import { db } from "@/lib/db";

export const updateShortAnswer = async ({
  sentence,
  blank,
  explanation,
  id
}: {
  sentence: string,
  blank?: string,
  explanation?: string,
  id: number
}) => {
  try {
    const shortAnswer = await db.shortAnswer.update({
      where: {
        id
      },
      data: {
        sentence,
        blank,
        explanation
      },
    });

    return shortAnswer;
  } catch (error) {
    console.error("Error updating shortAnswer:", error);
    return null;
  }
};


