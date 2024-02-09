"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createMatchingHeading = async ({
  questionGroupId,
}: {
  questionGroupId: number;
}) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: { id: questionGroupId },
    include: {
      questions: true,
      part: {
        select: {
          assessmentId: true,
          passage: {
            include: { passageMultiHeadingArray: true },
          },
        },
      },
    },
  });

  if (!questionGroup) {
    throw new Error("Question Group Id not found");
  }

  const { passage } = questionGroup.part;
  const passageHeadings = passage?.passageMultiHeadingArray || [];

  if (!passage || passageHeadings.length === 0) {
    throw new Error(
      "You need to create a passage before creating a Matching Heading question type, or something went wrong because you created a simple passage but are using the Matching Heading question type.",
    );
  }

  const totalQuestions = questionGroup.questions.length;
  const totalHeadings = passageHeadings.length;
  const redundant = 3;
  const totalListHeading = totalQuestions + redundant;

  if (totalHeadings < totalQuestions) {
    throw new Error(
      "The total number of headings in the passage is currently smaller than the total number of questions you want to create!",
    );
  }

  const matchingHeadingItems = Array.from({ length: totalListHeading }).map(
    (_, i) => ({
      content: i < totalQuestions ? passageHeadings[i].content : "a",
      passageMultiHeadingId: i < totalQuestions ? passageHeadings[i].id : null,
    }),
  );

  await db.matchingHeading.create({
    data: {
      questionGroupId: questionGroup.id,
      matchingHeadingItemArray: {
        createMany: { data: matchingHeadingItems },
      },
    },
  });

  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
  return true;
};
