"use server"

import { db } from "@/lib/db";
import { Passage} from "@prisma/client";

export const createQuestion = async ({
  title,
  description,
  partId
}: {
  title: string
  description: string,
  partId: string
}) => {
  try {
    const question = await db.question.create({
      data: {
        title,
        decription: description,
        partId
      },
    });

    return question;
  } catch (error) {
    console.error("Error creating question:", error);
    return null;
  }
};

export const updateQuestion = async ({
  title,
  id,
  description,
}: {
  title?: string
  description?: string
  id: string
}) => {
  try {
    const question = await db.question.update({
      where: {
        id
      },
      data: {
        title,
        decription: description,
        
      },
    });

    return question;
  } catch (error) {
    console.error("Error updating question:", error);
    return null;
  }
};
