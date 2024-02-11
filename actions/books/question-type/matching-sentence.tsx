"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createMatchingSentence = async ({
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

  const haveBlank = "this is example of sentence with";

  await db.matchingSentence.create({
    data: {
      title: "hello",
      questionGroupId,
      matchingSentenceItems: {
        create: questionGroup.questions.map((question) => ({
          content: haveBlank,
          blank: {
            create: {
              expectedAnswer: "blank",
              questionId: question.id,
            },
          },
        })),
      },
    },
  });

  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
  return true;
};
