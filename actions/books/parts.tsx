"use server"

import { db } from "@/lib/db";

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
