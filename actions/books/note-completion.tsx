"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";
import { IdentifyingInformationAnswer } from "@prisma/client";
import { error } from "console";

interface CreateNoteCompletionProps {
  // questionGroupId: number;
  // startQuestionNumber: number;
  // endQuestionNumber: number;
  // partId: number;
  // assessmentId: number;
  // numberGroupItemToCreate?: number;
  // title?: string;
}

export const createNoteCompletion = async ({}: // questionGroupId,
// startQuestionNumber,
// endQuestionNumber,
// partId,
// numberGroupItemToCreate = 2,
// assessmentId,
// title,
CreateNoteCompletionProps): Promise<boolean> => {
  try {
    // const noteCompletion = await db.noteCompletion.create({
    //   data: {
    //     questionGroupId,
    //     title: title || "Title Note Completion",
    //     noteCompletionGroupItemArray: {
    //       createMany: {
    //         data: Array.from({ length: numberGroupItemToCreate }).map(() => ({
    //           title: "title for note completion group item",
    //         })),
    //       },
    //     },
    //   },
    //   include: {
    //     noteCompletionGroupItemArray: {
    //       orderBy: { id: "asc" },
    //     },
    //   },
    // });
    // if (
    //   !noteCompletion ||
    //   !noteCompletion.noteCompletionGroupItemArray.length
    // ) {
    //   throw new Error("Failed to create note completion");
    // }
    // const groupIdArray = noteCompletion.noteCompletionGroupItemArray.map(
    //   (groupItem) => groupItem.id
    // );
    // console.log("🚀 ~ groupIdArray:", groupIdArray);
    const startQuestionNumber = 3;
    const endQuestionNumber = 5;
    const numberGroupItemToCreate = 2;
    const remainingQuestion =
      (endQuestionNumber - startQuestionNumber) % numberGroupItemToCreate;
    const totalQuestion = endQuestionNumber - startQuestionNumber + 1;
    const questionPerGroup = Math.floor(
      (endQuestionNumber - startQuestionNumber) / numberGroupItemToCreate
    );
    const adjustedTotal =
      questionPerGroup * numberGroupItemToCreate + remainingQuestion + 1;
    console.log(totalQuestion, adjustedTotal);

    Array.from({ length: numberGroupItemToCreate }).map((_, i) => {
      Array.from({
        length:
          i === numberGroupItemToCreate - 1
            ? questionPerGroup + remainingQuestion + 1
            : questionPerGroup,
      }).map((_, j) => {
        const questionNumber = startQuestionNumber + j + i * questionPerGroup;
        console.log(questionNumber);
      });
    });

    // await Promise.all(
    //   groupIdArray.map(async (groupId, groupIndex) => {
    //     const groupStartQuestion =
    //       startQuestionNumber +
    //       groupIndex * questionsPerGroup +
    //       (groupIndex === 0 ? +0 : +1);
    //     const groupEndQuestion =
    //       groupStartQuestion +
    //       questionsPerGroup +
    //       (groupIndex === numberGroupItemToCreate - 1
    //         ? +remainingQuestions + 1
    //         : 0);

    //     console.log(
    //       "🚀 ~ groupIdArray.map ~ groupStartQuestion:",
    //       groupStartQuestion
    //     );
    //     console.log(
    //       "🚀 ~ groupIdArray.map ~ groupEndQuestion:",
    //       groupEndQuestion
    //     );
    // const createBlankItemPromises = Array.from(
    //   { length: groupEndQuestion - groupStartQuestion + 1 },
    //   async (_, i) => console.log(groupStartQuestion + i)
    //   // await db.noteCompletionItem.create({
    //   //   data: {
    //   //     sentence: "Hello, What is ___ name?",
    //   //     noteCompletionGroupItemId: groupId,
    //   //     blank: {
    //   //       create: {
    //   //         noteCompletionGroupItem: {
    //   //           connect: {
    //   //             id: groupId
    //   //           }
    //   //         },
    //   //         expectedAnswer: "your",
    //   //         question: {
    //   //           create: {
    //   //             questionNumber: groupStartQuestion + i,
    //   //             partId,
    //   //             assessmentId,
    //   //             noteCompletionId: noteCompletion.id,
    //   //           },
    //   //         },
    //   //       },
    //   //     },
    //   //   },
    //   // })
    // );

    // const createNonBlankItemPromise = await db.noteCompletionItem.create({
    //   data: {
    //     sentence: "This sentence will not have a blank for testing",
    //     noteCompletionGroupItemId: groupId,
    //   },
    // });

    // return Promise.all([
    //   ...createBlankItemPromises,
    //   createNonBlankItemPromise,
    // ]);
    //   })
    // );

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
