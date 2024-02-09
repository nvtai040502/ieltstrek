"use server";

import { db } from "@/lib/db";
import { Passage, PassageType } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const createPassageSimple = async ({
  title,
  partId,
}: {
  title: string;
  partId: number;
}) => {
  try {
    const passageSimple = await db.passage.create({
      data: {
        title,
        content: "This is example for simple passage",
        partId,
        description: "this is description",
        type: "PASSAGE_SIMPLE",
      },
    });

    return passageSimple;
  } catch (e) {}
};
export const createPassageMultiHeading = async ({
  title,
  partId,
}: {
  title: string;
  partId: number;
}) => {
  try {
    const numberHeading = 5;
    const passageMultiHeading = await db.passage.create({
      data: {
        title,
        content: "This is example for simple passage",
        partId,
        description: "this is description",
        type: "PASSAGE_MULTI_HEADING",
        passageMultiHeadingArray: {
          createMany: {
            data: Array.from({ length: numberHeading }).map((_, i) => ({
              title: `Title for Heading ${i + 1}`,
              content: "this is Example for create multiple heading",
            })),
          },
        },
      },
    });

    return passageMultiHeading;
  } catch (e) {}
};
export const createPassage = async ({
  title,
  partId,
  type,
}: {
  title: string;
  type: PassageType;
  partId: number;
}) => {
  try {
    if (type === "PASSAGE_SIMPLE") {
      return await createPassageSimple({ title, partId });
    }
    if (type === "PASSAGE_MULTI_HEADING") {
      return await createPassageMultiHeading({ title, partId });
    }
  } catch (error) {
    console.error("Error creating Passage:", error);
    return null;
  }
};

export const updatePassageMultiHeading = async ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: number;
}) => {
  const passageMultiHeading = await db.passageMultiHeading.findUnique({
    where: {
      id,
    },
    select: {
      passage: {
        select: {
          part: {
            select: {
              assessmentId: true,
            },
          },
        },
      },
    },
  });
  if (!passageMultiHeading) {
    throw new Error("Id not found, please try again.");
  }
  await db.passageMultiHeading.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
  revalidatePath(
    `/assessments/${passageMultiHeading.passage.part.assessmentId}`,
  );
  return;
};

export const updatePassage = async ({
  title,
  content,
  id,
  description,
}: {
  title: string;
  content?: string;
  description?: string;
  id: number;
}) => {
  try {
    const passage = await db.passage.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        description,
      },
    });

    return passage;
  } catch (error) {
    console.error("Error updating Passage:", error);
    return null;
  }
};
