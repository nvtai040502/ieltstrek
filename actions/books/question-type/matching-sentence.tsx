"use server";
// import { noteCompletionInitial } from "@/config/template/note-completion";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Descendant } from "slate";

export const createMatchingSentence = async ({
  questionGroupId,
}: {
  questionGroupId: number;
}): Promise<boolean> => {
  const questionGroup = await db.questionGroup.findUnique({
    where: { id: questionGroupId },
    include: {
      questions: true,
      part: {
        select: {
          assessmentId: true,
        },
      },
    },
  });

  if (!questionGroup) {
    throw new Error("Question Group Id not found");
  }

  const matchingSentenceInitial: Descendant[] = Array.from(
    {
      length:
        questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1,
    },
    (_, i) => ({
      type: "paragraph",
      children: [
        { text: "This is matching sentence example" },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        {
          text: "<textarea>",
          code: true,
          questionNumber: questionGroup.startQuestionNumber + i,
        },
        { text: "!" },
      ],
    }),
  );

  const totalQuestions = questionGroup.questions.length;
  const totalFakeChoices = 3;
  const totalChoicesCreated = totalFakeChoices + totalQuestions;

  await db.matchingSentence.create({
    data: {
      questionGroupId,
      paragraph: JSON.stringify(matchingSentenceInitial),
      listMatchingChoices: {
        create: {
          title: "List of Heading",
          questionGroupId,
          matchingChoices: {
            createMany: {
              data: Array.from({ length: totalChoicesCreated }).map((_, i) => ({
                content:
                  "This is a sentence example for heading choice so that can drag and drop to the answer",
                questionId:
                  i < totalQuestions - 1 ? questionGroup.questions[i].id : null,
              })),
            },
          },
        },
      },
    },
  });
  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
  return true;
};
