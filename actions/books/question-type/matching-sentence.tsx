"use server";
// import { noteCompletionInitial } from "@/config/template/note-completion";
import { db } from "@/lib/db";
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
  await db.matchingSentence.create({
    data: {
      questionGroupId,
      paragraph: JSON.stringify(matchingSentenceInitial),
      listMatchingChoices: {
        create: {
          title: "List of Heading",
          matchingChoices: {
            createMany: {
              data: questionGroup.questions.map((question) => ({
                content:
                  "This is a sentence example for heading choice so that can drag and drop to the answer",
                questionId: question.id,
              })),
            },
          },
        },
      },
      // blanks: {
      //   createMany: {
      // data: questionGroup.questions.map((question) => ({
      //   expectedAnswer: "is",
      //   questionId: question.id,
      // })),
      //   },
      // },
    },
  });

  return true;
};
export const updateNoteCompletion = async ({
  id,
  paragraph,
}: {
  id: number;
  paragraph: string;
}): Promise<boolean> => {
  try {
    await db.noteCompletion.update({
      where: {
        id,
      },
      data: {
        paragraph,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating note completion:", error);
    return false;
  }
};
