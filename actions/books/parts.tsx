"use server"

import { db } from "@/lib/db";
export const updatePart = async ({
  title,
  description,
  id
}: {
  title?: string
  description?: string,
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

export const createAssessmentParts = async ({
  assessmentId,
  numberOfPartsToCreate
}: {
  assessmentId: string,
  numberOfPartsToCreate: number
}) => {
  try {
    const partsData = Array.from({ length: numberOfPartsToCreate }, () => ({ assessmentId }));
    const createdParts = await db.part.createMany({
      data: partsData,
    });

    return createdParts;
  } catch (error) {
    console.error("Error creating assessment parts:", error);
    return [];
  }
};
