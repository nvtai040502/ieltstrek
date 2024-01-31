"use server"
import { db } from "@/lib/db";

export const updateSummaryCompletion = async ({
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
    const summaryCompletion = await db.summaryCompletion.update({
      where: {
        id
      },
      data: {
        sentence,
        blank,
        explanation
      },
    });

    return summaryCompletion;
  } catch (error) {
    console.error("Error updating summaryCompletion:", error);
    return null;
  }
};


