"use server"

import { db } from "@/lib/db";
import { Passage} from "@prisma/client";

export const createScorableItem = async ({
  content,
  questionId
}: {
  content: string
  questionId: string
}) => {
  try {
    const scorableItem = await db.scorableItem.create({
      data: {
        content,
        questionId
      },
    });

    return scorableItem;
  } catch (error) {
    console.error("Error creating scorableItem:", error);
    return null;
  }
};

export const updateScorableItem = async ({
  content,
  id,
}: {
  content?: string
  id: string
}) => {
  try {
    const scorableItem = await db.scorableItem.update({
      where: {
        id
      },
      data: {
        content
        
      },
    });

    return scorableItem;
  } catch (error) {
    console.error("Error updating scorableItem:", error);
    return null;
  }
};
