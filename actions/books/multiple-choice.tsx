"use server"
import { db } from "@/lib/db";

export const updateMultipleChoice = async ({
  title,
  id,
}: {
  title: string
  id: string
}) => {
  try {
    const multipleChoice = await db.multipleChoice.update({
      where: {
        id
      },
      data: {
        title
      },
    });

    return multipleChoice;
  } catch (error) {
    console.error("Error updating multipleChoice:", error);
    return null;
  }
};



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
