"use server";

import { db } from "@/lib/db";
import { AssessmentExtended } from "@/types/db";
import { Assessment } from "@prisma/client";

export const createAssessment = async ({
  name,
  imageCover,
  bookName,
}: {
  imageCover?: string;
  bookName?: string;
  name: string;
}): Promise<Assessment | undefined> => {
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
    return undefined;
  }
};
type TemplateType = {
  "Part 1": {
    startQuestionNumber: number;
    endQuestionNumber: number;
  }[];
  "Part 2": {
    startQuestionNumber: number;
    endQuestionNumber: number;
  }[];
  "Part 3": {
    startQuestionNumber: number;
    endQuestionNumber: number;
  }[];
};

const Template: TemplateType = {
  "Part 1": [
    { startQuestionNumber: 1, endQuestionNumber: 6 },
    { startQuestionNumber: 7, endQuestionNumber: 13 },
  ],
  "Part 2": [
    { startQuestionNumber: 14, endQuestionNumber: 21 },
    { startQuestionNumber: 22, endQuestionNumber: 27 },
  ],
  "Part 3": [
    { startQuestionNumber: 28, endQuestionNumber: 34 },
    { startQuestionNumber: 35, endQuestionNumber: 40 },
  ],
};
