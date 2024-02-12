"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateListMatchingChoices = async ({
  id,
  title,
  matchingChoices,
}: {
  matchingChoices: string[];
  id: number;
  title: string;
}) => {
  const lisMatchingChoices = await db.listMatchingChoices.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      matchingSentenceId: true,
      questionGroup: {
        select: {
          id: true,
          questions: {
            orderBy: {
              questionNumber: "asc",
            },
          },
          part: {
            select: {
              assessmentId: true,
            },
          },
        },
      },
      matchingChoices: {
        orderBy: {
          question: {
            questionNumber: "asc",
          },
        },
      },
    },
  });

  if (!lisMatchingChoices) {
    throw new Error("Question Group Id not found");
  }

  if (matchingChoices.length !== lisMatchingChoices.matchingChoices.length) {
    const matchingSentenceId = lisMatchingChoices.matchingSentenceId;
    if (!matchingSentenceId) {
      throw new Error("Matching Sentence Id is missing");
    }
    await db.listMatchingChoices.delete({
      where: {
        id,
      },
    });

    await db.listMatchingChoices.create({
      data: {
        title,
        questionGroupId: lisMatchingChoices.questionGroup.id,
        matchingSentenceId: matchingSentenceId,
        matchingChoices: {
          createMany: {
            data: matchingChoices.map((content, i) => ({
              content,
              questionId:
                i < lisMatchingChoices.questionGroup.questions.length - 1
                  ? lisMatchingChoices.questionGroup.questions[i].id
                  : null,
            })),
          },
        },
      },
    });
  } else {
    await db.listMatchingChoices.update({
      where: {
        id: lisMatchingChoices.id,
      },
      data: {
        title,
        matchingChoices: {
          update: lisMatchingChoices.matchingChoices.map(
            (matchingChoice, i) => ({
              where: {
                id: matchingChoice.id,
              },
              data: {
                content: matchingChoices[i],
              },
            }),
          ),
        },
      },
    });
  }

  revalidatePath(
    `/assessments/${lisMatchingChoices.questionGroup.part.assessmentId}`,
  );
  return;
};
