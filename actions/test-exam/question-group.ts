'use server';

import { revalidatePath } from 'next/cache';
import { createMultiMoreList } from '../question-type/multi-more';
import { createMultiOneList } from '../question-type/multi-one';
import { createNoteCompletion } from '../question-type/note-completion';
import { createTableCompletion } from '../question-type/table-completion';
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
  const { numberColumns, numberRows, ...rest } = formData;
  if (formData.type === 'TABLE_COMPLETION') {
    if (!numberColumns || !numberRows) {
      throw new Error('Missing number Col, Row');
    }
  }
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
        gte: formData.startQuestionNumber,
        lte: formData.endQuestionNumber
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
      ...rest,
      partId,
      questions: {
        createMany: {
          data: Array.from({
            length:
              formData.endQuestionNumber - formData.startQuestionNumber + 1
          }).map((_, i) => ({
            questionNumber: formData.startQuestionNumber + i,
            partId,
            assessmentId: part.assessmentId
          }))
        }
      }
    }
  });
  switch (questionGroup.type) {
    case 'MULTIPLE_CHOICE_ONE_ANSWER':
      await createMultiOneList({
        questionGroupId: questionGroup.id
      });
      break;
    case 'MULTIPLE_CHOICE_MORE_ANSWERS':
      await createMultiMoreList({
        questionGroupId: questionGroup.id
      });
      break;
    case 'NOTE_COMPLETION':
      await createNoteCompletion({
        questionGroupId: questionGroup.id
      });
      break;
    case 'TABLE_COMPLETION':
      await createTableCompletion({
        questionGroupId: questionGroup.id,
        numberColumns: numberColumns!,
        numberRows: numberRows!
      });
      break;
    default:
      throw new Error(`Unsupported question group type: ${formData.type}`);
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
