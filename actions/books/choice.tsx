"use server";
import { db } from "@/lib/db";

export const updateChoice = async ({
  content,
  id,
}: {
  content: string;
  id: number;
}) => {
  try {
    const choice = await db.choice.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return choice;
  } catch (error) {
    console.error("Error updating choice:", error);
    return null;
  }
};
