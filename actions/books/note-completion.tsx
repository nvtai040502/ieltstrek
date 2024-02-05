"use server";
import { db } from "@/lib/db";

export const createNoteCompletion = async ({
  title,
  questionGroupId,
}: {
  title?: string;
  questionGroupId: number;
}): Promise<boolean> => {
  try {
    const questionGroup = await db.questionGroup.findUnique({
      where: {
        id: questionGroupId,
      },
      include: {
        questions: true,
      },
    });
    if (!questionGroup) {
      throw new Error("Id not found");
    }

    await db.noteCompletion.create({
      data: {
        questionGroupId,
        paragraph: "Hello, what ___ you name?",
        title: title || "Hello",
        blanks: {
          createMany: {
            data: questionGroup.questions.map((question) => ({
              expectedAnswer: "is",
              questionId: question.id,
            })),
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating note completion:", error);
    return false;
  }
};
