"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";
import { IdentifyingInformationAnswer } from "@prisma/client";
import { error } from "console";

interface CreateNoteCompletionProps {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
  partId: number;
  assessmentId: number;
  numberGroupItemToCreate?: number;
  title?: string;
}

export const createNoteCompletion = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  partId,
  numberGroupItemToCreate = 2,
  assessmentId,
  title,
}: CreateNoteCompletionProps): Promise<boolean> => {
  try {
    const noteCompletion = await db.noteCompletion.create({
      data: {
        questionGroupId,
        title: title || "Title Note Completion",
        noteCompletionGroupItemArray: {
          createMany: {
            data: Array.from({ length: numberGroupItemToCreate }).map(() => ({
              title: "title for note completion group item",
            })),
          },
        },
      },
      include: {
        noteCompletionGroupItemArray: {
          orderBy: { id: "asc" },
        },
      },
    });
    if (
      !noteCompletion ||
      !noteCompletion.noteCompletionGroupItemArray.length
    ) {
      throw new Error("Failed to create note completion");
    }
    const groupIdArray = noteCompletion.noteCompletionGroupItemArray.map(
      (groupItem) => groupItem.id
    );

    const remainingQuestion =
      (endQuestionNumber - startQuestionNumber) % numberGroupItemToCreate;
    const questionPerGroup = Math.floor(
      (endQuestionNumber - startQuestionNumber) / numberGroupItemToCreate
    );
    groupIdArray.map((groupId, i) => {
      Array.from({
        length:
          i === numberGroupItemToCreate - 1
            ? questionPerGroup + remainingQuestion + 1
            : questionPerGroup,
      }).map(async (_, j) => {
        const questionNumber = startQuestionNumber + j + i * questionPerGroup;

        await db.noteCompletionItem.create({
          data: {
            sentence: "Hello, What is ___ name?",
            noteCompletionGroupItemId: groupId,
            blank: {
              create: {
                noteCompletionGroupItem: {
                  connect: {
                    id: groupId,
                  },
                },
                expectedAnswer: "your",
                question: {
                  create: {
                    questionNumber,
                    partId,
                    assessmentId,
                    noteCompletionId: noteCompletion.id,
                  },
                },
              },
            },
          },
        });
      });
    });

    return true;
  } catch (error) {
    console.error("Error creating note completion:", error);
    return false;
  }
};

export const updateNoteCompletion = async ({
  id,
  title,
  groupItemAmount,
}: {
  id: number;
  title: string;
  groupItemAmount: number;
}): Promise<boolean> => {
  try {
    const noteCompletion = await db.noteCompletion.findUnique({
      where: { id },
      include: {
        noteCompletionGroupItemArray: true,
      },
    });
    if (!noteCompletion) {
      throw new Error("Id not found");
    }
    const questionGroup = await db.questionGroup.findUnique({
      where: {
        id: noteCompletion.questionGroupId,
      },
      include: {
        part: true,
      },
    });
    if (!questionGroup) {
      throw new Error("");
    }
    if (
      groupItemAmount !== noteCompletion.noteCompletionGroupItemArray.length
    ) {
      await db.noteCompletion.delete({
        where: { id },
      });

      await createNoteCompletion({
        questionGroupId: noteCompletion.questionGroupId,
        startQuestionNumber: questionGroup.startQuestionNumber,
        endQuestionNumber: questionGroup.endQuestionNumber,
        partId: questionGroup.partId,
        assessmentId: questionGroup.part.assessmentId,
        numberGroupItemToCreate: groupItemAmount,
        title,
      });
    } else {
      await db.noteCompletion.update({
        where: { id },
        data: {
          title,
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error creating note completion:", error);
    return false;
  }
};
