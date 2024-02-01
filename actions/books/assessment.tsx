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

export const createAssessmentTemplate = async ({
  assessmentId,
}: {
  assessmentId: number;
}): Promise<boolean> => {
  try {
    await Promise.all(
      Array.from({ length: 3 }).map(async (_, i) => {
        const part = await db.part.create({
          data: {
            title: `Part ${i + 1}`,
            description: "Description",
            assessmentId,
          },
        });

        if (part) {
          await db.passage.create({
            data: {
              partId: part.id,
              title: "hello",
              description: "hello",
              content: "hello",
            },
          });

          await Promise.all(
            Array.from({ length: 2 }).map(async (_, j) => {
              const partKey = `Part ${i + 1}` as keyof TemplateType;
              const questionGroup = await db.questionGroup.create({
                data: {
                  startQuestionNumber: Template[partKey][j].startQuestionNumber,
                  endQuestionNumber: Template[partKey][j].endQuestionNumber,
                  title: "hello",
                  type: "MULTIPLE_CHOICE",
                  partId: part.id,
                },
              });

              if (questionGroup && questionGroup.type === "MULTIPLE_CHOICE") {
                for (
                  let m = questionGroup.startQuestionNumber;
                  m <= questionGroup.endQuestionNumber;
                  m++
                ) {
                  await db.multipleChoice.create({
                    data: {
                      questionNumber: m,
                      title: "Hello",
                      questionGroupId: questionGroup.id,
                      assessmentId,
                      choices: {
                        createMany: {
                          data: [
                            { content: "Option 1", isCorrect: false },
                            { content: "Option 2", isCorrect: false },
                            { content: "Option 3", isCorrect: false },
                            { content: "Option 4", isCorrect: true },
                          ],
                        },
                      },
                    },
                  });
                }
              }
            })
          );
        }
      })
    );

    return true;
  } catch (error) {
    console.error("Error creating Assessment:", error);
    return false;
  }
};
