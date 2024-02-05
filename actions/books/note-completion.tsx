"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";
import { IdentifyingInformationAnswer } from "@prisma/client";
import { error } from "console";
import { number } from "zod";

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
      },
    });
    if (!noteCompletion) {
      throw new Error("Failed to create note completion");
    }

    const remainingQuestion =
      (endQuestionNumber - startQuestionNumber) % numberGroupItemToCreate;
    const questionPerGroup = Math.floor(
      (endQuestionNumber - startQuestionNumber) / numberGroupItemToCreate
    );
    Array.from({ length: numberGroupItemToCreate }).map(async(_, i) => {
      const startQuestionGroupNumber =
        startQuestionNumber + i * questionPerGroup;
      const endQuestionGroupNumber =
        i === numberGroupItemToCreate - 1
          ? questionPerGroup + remainingQuestion + 1
          : questionPerGroup;

      const groupItem = await db.noteCompletionGroupItem.create({
        data: {
          title: "Title For Group Item",
          startQuestionNumber: startQuestionGroupNumber,
          endQuestionNumber: endQuestionGroupNumber,
          noteCompletionId: noteCompletion.id
        }
      })
      if (!groupItem) {
        throw new Error ("Cannot create group item")
      }
      Array.from({
        length: endQuestionGroupNumber,
      }).map(async (_, j) => {
        const questionNumber = startQuestionGroupNumber + j;

        await db.noteCompletionItem.create({
          data: {
            sentence: "Hello, What is ___ name?",
            noteCompletionGroupItemId: groupItem.id,
            blank: {
              create: {
                noteCompletionGroupItem: {
                  connect: {
                    id: groupItem.id,
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
export const updateNoteCompletionGroupItem = async ({
  id,
  title,
  sentences,
  expectedAnswers,
}: {
  id: number;
  title?: string;
  sentences: string[];
  expectedAnswers: string[];
}) => {
  try {
    const groupItem = await db.noteCompletionGroupItem.findUnique({
      where: { id },
      include: {
        blanks: true,
      },
    });
    if (!groupItem) {
      throw new Error("Id not found");
    }
    if (expectedAnswers.length !== groupItem.blanks.length) {
    }
    return true;
  } catch (error) {
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
