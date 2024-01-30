"use server"

import { db } from "@/lib/db";
import { Part } from "@prisma/client";
export const updatePart = async ({
  title,
  description,
  id
}: {
  title: string
  description: string,
  id: string,
}) => {
  try {
    const part = await db.part.update({
      where: {
        id
      },
      data: {
        title,
        description,
      },
    });

    return part;
  } catch (error) {
    console.error("Error updating Assessment:", error);
    return null;
  }
};
export const createParts = async ({
  assessmentId,
  numberOfPartsToCreate,
}: {
  assessmentId: string;
  numberOfPartsToCreate: number;
}) => {
  try {

    await db.part.createMany({
      data: Array.from({ length: numberOfPartsToCreate }).map((_,i) => {
        return {
          title: `Part ${i + 1}`,
          description: "Description",
          assessmentId
        };
      }),
    });

    return true;
  } catch (error) {
    console.error("Error creating assessment parts:", error);
    return false;
  }
};