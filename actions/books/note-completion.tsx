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
}

export const createNoteCompletion = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  partId,
  assessmentId,
}: CreateNoteCompletionProps): Promise<boolean> => {
  try {
    const noteCompletion = await db.noteCompletion.create({
      data: {
        questionGroupId,
        title: "Hello",
        noteCompletionGroupItemArray: {
          create: {},
        },
      },
      include: {
        noteCompletionGroupItemArray: true,
      },
    });

    if (!noteCompletion || !noteCompletion.noteCompletionGroupItemArray[0]) {
      throw new Error("Failed to create note completion");
    }

    const groupId = noteCompletion.noteCompletionGroupItemArray[0].id;
    // Create note completion items based on the range
    await Promise.all(
      Array.from(
        { length: endQuestionNumber - startQuestionNumber + 1 },
        async (_, i) =>
          await db.noteCompletionItem.create({
            data: {
              sentence: "Hello, What is ___ name?",
              noteCompletionGroupItemId: groupId,
              blank: {
                create: {
                  expectedAnswer: "your",
                  question: {
                    create: {
                      questionNumber: startQuestionNumber + i,
                      partId,
                      assessmentId,
                    },
                  },
                },
              },
            },
          })
      )
    );

    return true;
  } catch (error) {
    console.error("Error creating note completion:", error);
    return false;
  }
};
