"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";

export const createSummaryCompletion = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  partId,
  assessmentId,
}: {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
  partId: number;
  assessmentId: number;
}) => {
  try {
    const sentence = "Hello, this ___ a website simulate ielts test exam?";
    const paragraphWithBlanks = Array.from(
      { length: endQuestionNumber - startQuestionNumber + 1 },
      () => sentence
    ).toString();

    const questions = await Promise.all(
      Array.from({ length: endQuestionNumber - startQuestionNumber + 1 }, async (_, i) => {
        const question = await createQuestion({
          partId,
          assessmentId,
          questionNumber: startQuestionNumber + i,
        });

        if (!question) {
          throw new Error("Error creating question");
        }

        return question;
      })
    );

    const summaryCompletion = await db.summaryCompletion.create({
      data: {
        paragraphWithBlanks,
        questionGroupId,
        summaryCompletionItems: {
          createMany: {
            data: questions.map((question) => ({
              expectedAnswer: "is",
              questionId: question.id,
            })),
          },
        },
      },
      include: {
        summaryCompletionItems: true,
      },
    });

    console.log("Summary completion created:", summaryCompletion);
    return true;
  } catch (error) {
    console.log("Error creating summaryCompletion:", error);
    return false;
  }
};

// export const updateSummaryCompletion = async ({
//   paragraphWithBlanks,
//   expectedAnswers,
//   id,
// }: {
//   paragraphWithBlanks: string;
//   expectedAnswers: string[];
//   id: number;
// }) => {
//   try {
//     const summaryCompletionUpdated = await db.summaryCompletion.update({
//       where: { id },
//       data: {
//         paragraphWithBlanks,
//         questions: {},  // You may need to provide the correct type for questions as well
//         summaryCompletionItems: {
//           updateMany: {
//             where: { summaryCompletionId: id },
//             data: {
//               expectedAnswer: {
//                 set: expectedAnswers,
//               },
//             },
//           },
//         },
//       },
//     });

//     return summaryCompletionUpdated;
//   } catch (error) {
//     console.log("Error updating summaryCompletion:", error);
//     throw error;
//   }
// };