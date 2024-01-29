"use server"

import { db } from "@/lib/db";
import { Part } from "@prisma/client";
export const updatePart = async ({
  title,
  description,
  numberQuestion,
  id
}: {
  title?: string
  description?: string,
  id: string,
  numberQuestion?: number
}) => {
  try {
    const part = await db.part.update({
      where: {
        id
      },
      data: {
        title,
        description,
        numberQuestion
      },
    });

    return part;
  } catch (error) {
    console.error("Error updating Assessment:", error);
    return null;
  }
};

export const createAssessmentParts = async ({
  assessmentId,
  numberOfPartsToCreate
}: {
  assessmentId: string,
  numberOfPartsToCreate: number
}) => {
  try {
    const parts: Part[] = [];

    for (let i = 0; i < numberOfPartsToCreate; i++) {
      const part = await db.part.create({
        data: {
          assessmentId
        },
      });
      parts.push(part);
    }

    return parts;
  } catch (error) {
    console.error("Error creating assessment parts:", error);
    return [];
  }
};
