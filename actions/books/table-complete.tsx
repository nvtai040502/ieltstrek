"use server";
import { db } from "@/lib/db";
import { Descendant } from "slate";

export const createTableComplete = async ({
  questionGroupId,
  numberColumns,
  numberRows,
}: {
  questionGroupId: number;
  numberColumns: number;
  numberRows: number;
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
    const maxCode =
      questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1;
    let codeCount = 0;
    const tableCompleteInitial: Descendant[] = [
      {
        type: "paragraph",
        children: [
          {
            text: "Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:",
          },
        ],
      },
      {
        type: "table",
        children: Array.from(
          {
            length: numberRows,
          },
          () => ({
            type: "table-row",
            children: Array.from(
              {
                length: numberColumns,
              },
              (_, j) => {
                const isCode = j % 2 !== 0 && codeCount < maxCode;
                if (isCode) {
                  codeCount++;
                }
                return {
                  type: "table-cell",
                  children: [{ text: "Human", bold: true, code: isCode }],
                };
              },
            ),
          }),
        ),
      },
    ];

    await db.noteCompletion.create({
      data: {
        questionGroupId,
        paragraph: JSON.stringify(noteCompletionInitial),
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
