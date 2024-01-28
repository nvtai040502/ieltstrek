"use server"

import { db } from "@/lib/db";
import { Assessment } from "@prisma/client";

export const createAssessment = async ({
  name,
  imageCover,
  bookName,
}: {
  imageCover?: string
  bookName?: string,
  name: string
}) => {
  try {
    const assessment = await db.assessment.create({
      data: {
        name,
        imageCover,
        bookName,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error creating Assessment:", error);
    return null;
  }
};
