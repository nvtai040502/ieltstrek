"use server"

import { db } from "@/lib/db";
import { Passage, SessionType, Test } from "@prisma/client";

export const createPassage = async ({
  title,
  content,
  sectionId,
  description,
  imageHeader
}: Pick<Passage,|"title" |"content" |"description" |"imageHeader" |"sectionId">) => {
  try {
    const passage = await db.passage.create({
      data: {
        title,
        content,
        sectionId,
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
