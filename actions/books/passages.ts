"use server"

import { db } from "@/lib/db";
import { Passage} from "@prisma/client";

export const createPassage = async ({
  title,
  content,
  partId,
  description,
  imageHeader
}: {
  title: string
  content: string
  imageHeader?: string
  description?: string
  partId: string
}) => {
  try {
    const passage = await db.passage.create({
      data: {
        title,
        content,
        partId,
        description,
        imageHeader
      },
    });

    return passage;
  } catch (error) {
    console.error("Error creating Passage:", error);
    return null;
  }
};

export const updatePassage = async ({
  title,
  content,
  id,
  description,
  imageHeader
}: {
  title: string
  content: string
  imageHeader?: string
  description?: string
  id: string
}) => {
  try {
    const passage = await db.passage.update({
      where: {
        id
      },
      data: {
        title,
        content,
        description,
        imageHeader
      },
    });

    return passage;
  } catch (error) {
    console.error("Error updating Passage:", error);
    return null;
  }
};
