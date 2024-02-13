'use server';

import { revalidatePath } from 'next/cache';
import { createMultiOneArray } from '../books/multi-one';
import { db } from '@/lib/db';
import { QuestionGroupSchema } from '@/lib/validations/question-group';
import { z } from 'zod';

export const createQuestionGroup = async ({
  formData,
  partId
}: {
  formData: z.infer<typeof QuestionGroupSchema>;
  partId: string;
}) => {
  const { startQuestionNumber, endQuestionNumber, type } = formData;
  const part = await db.part.findUnique({
    where: {
      id: partId
    },
    select: {
      assessmentId: true
    }
  });
  if (!part) {
    throw new Error('Part Id not found!');
  }

  const existingQuestionNumbers = await db.question.findMany({
    where: {
      assessmentId: part.assessmentId,

      questionNumber: {
        gte: startQuestionNumber,
        lte: endQuestionNumber
      }
    },
    select: {
      questionNumber: true
    }
  });
  if (existingQuestionNumbers.length) {
    const existingNumbersArray = existingQuestionNumbers.map(
      (item) => item.questionNumber
    );
    throw new Error(
      `The following Questions ${existingNumbersArray.join(', ')} already exist. Please try again.`
    );
  }

  const questionGroup = await db.questionGroup.create({
    data: {
      ...formData,
      partId,
      questions: {
        createMany: {
          data: Array.from({
            length: endQuestionNumber - startQuestionNumber + 1
          }).map((_, i) => ({
            questionNumber: startQuestionNumber + i,
            partId,
            assessmentId: part.assessmentId
          }))
        }
      }
    }
  });
  switch (questionGroup.type) {
    case 'MULTIPLE_CHOICE':
      await createMultiOneArray({
        questionGroupId: questionGroup.id
      });
      break;

    default:
      throw new Error(`Unsupported question group type: ${type}`);
  }
  revalidatePath(`/assessments/${part.assessmentId}`);
  return;
};

// export const updateQuestionGroup = async ({
//   title,
//   description,
//   startQuestionNumber,
//   type,
//   endQuestionNumber,
//   id,
// }: {
//   title: string;
//   description?: string;
//   startQuestionNumber: number;
//   type: QuestionType;
//   endQuestionNumber: number;
//   id: number;
// }) => {
//   try {
//     const questionGroup = await db.questionGroup.findUnique({
//       where: { id },
//     });
//     if (!questionGroup) {
//       return { error: `Id of Question Group not found` };
//     }
//     if (
//       type !== questionGroup.type ||
//       startQuestionNumber !== questionGroup.startQuestionNumber ||
//       endQuestionNumber !== questionGroup.endQuestionNumber
//     ) {
//       return {
//         error:
//           "For now, not support update Type, Start/End Question number yet. If needed you should delete this Question Group!",
//       };
//     }

//     const questionGroupUpdated = await db.questionGroup.update({
//       where: {
//         id,
//       },
//       data: {
//         title,
//         description,
//       },
//     });
//     return {
//       success: "Successfully updated questionGroup!",
//       data: questionGroupUpdated,
//     };
//   } catch (error) {
//     console.error("Error creating questionGroup:", error);
//     return { error: "Failed to update questionGroup." };
//   }
// };

// export const deleteQuestionGroup = async ({ id }: { id: number }) => {
//   try {
//     const questionGroup = await db.questionGroup.findUnique({
//       where: { id },
//     });

//     if (!questionGroup) {
//       return {
//         error: `QuestionGroup with id ${id} not found. Deletion failed.`,
//       };
//     }
//     await db.questionGroup.delete({
//       where: { id },
//     });
//     return {
//       success: "Successfully deleted questionGroup!",
//     };
//   } catch (error) {
//     console.error("Error deleting questionGroup:", error);
//     return { error: "Failed to delete questionGroup." };
//   }
// };
