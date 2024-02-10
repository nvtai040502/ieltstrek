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
  {
    questionGroup.questions.map(async (question, i) => {
      await db.passageMultiHeading.update({
        where: {
          id: passageHeadings[i].id,
        },
        data: {
          questionId: question.id,
        },
      });
    });
  }
  await db.matchingHeading.create({
    data: {
      questionGroupId: questionGroup.id,
      title: "List of headings",
      matchingHeadingItemArray: {
        create: Array.from({ length: totalListHeading }).map((_, i) => ({
          content:
            i < totalQuestions
              ? `${passageHeadings[i].content} ${i}`
              : `a ${i}`,
          passageMultiHeadingId:
            i < totalQuestions ? passageHeadings[i].id : null,
          // passageMultiHeading: {
          //   connect: {
          //     questionId:
          //       i < totalQuestions ? questionGroup.questions[i].id : null,
          //   },
          // },
        })),
      },
    },
  });

  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
  return true;
};

export const updateMatchingHeading = async ({
  id,
  headingItems,
  title,
}: {
  id: number;
  headingItems: string[];
  title: string;
}) => {
  const matchingHeading = await db.matchingHeading.findUnique({
    where: { id },
    select: {
      questionGroup: {
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

  if (!matchingHeading) {
    throw new Error("Matching Heading Id not found");
  }
  const items = await db.matchingHeadingItem.findMany({
    where: {
      matchingHeadingId: id,
    },
    orderBy: {
      id: "asc",
    },
  });

  if (items.length !== headingItems.length) {
    throw new Error(
      "Number of items doesn't match the number of heading items",
    );
  }

  await Promise.all(
    items.map(async (item, i) => {
      await db.matchingHeadingItem.update({
        where: { id: item.id },
        data: { content: headingItems[i] },
      });
    }),
  );

  await db.matchingHeading.update({
    where: { id },
    data: {
      title,
    },
  });

  revalidatePath(
    `/assessments/${matchingHeading.questionGroup.part.assessmentId}`,
  );
  return true;
};
