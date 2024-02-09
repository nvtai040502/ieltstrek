"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createMatchingHeading = async ({
  questionGroupId,
}: {
  questionGroupId: number;
}) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: {
      id: questionGroupId,
    },
    include: {
      questions: true,
      part: {
        select: {
          assessmentId: true,
          passage: {
            include: {
              passageMultiHeadingArray: true,
            },
          },
        },
      },
    },
  });
  if (!questionGroup) {
    throw new Error("Question Group Id not found");
  }

  if (
    !questionGroup.part.passage ||
    questionGroup.part.passage.passageMultiHeadingArray.length === 0
  ) {
    throw new Error(
      "You need to create passage first before creating question type Matching Heading, or some thing went wrong because you create passage simple but use matching heading question type",
    );
  }

  if (
    questionGroup.part.passage.passageMultiHeadingArray.length <
    questionGroup.questions.length
  ) {
    throw new Error(
      "the total heading of the passage currently smaller than total questions you want to create!",
    );
  }

  const redundant = 3;
  const totalListHeading = questionGroup.questions.length + redundant;

  await db.matchingHeading.create({
    data: {
      questionGroupId: questionGroup.id,
      matchingHeadingItemArray: {
        createMany: {
          data: Array.from({ length: totalListHeading }).map((_, i) => ({
            content: "a",
            passageMultiHeadingId:
              i < questionGroup.questions.length - 1
                ? questionGroup.part.passage?.passageMultiHeadingArray[i].id
                : null,
          })),
        },
      },
    },
  });

  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
  return true;
};
