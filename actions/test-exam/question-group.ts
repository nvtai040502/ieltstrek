'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import {
  QuestionGroupSchema,
  QuestionGroupSchemaType
} from '@/lib/validations/question-group';
import { createCompletion } from '../question-type/completion';
import { createIdentifyInfoList } from '../question-type/identify-info';
import { createMatching } from '../question-type/matching';
import { createMultiMoreList } from '../question-type/multiple-choice/multi-more';
import { createMultiOneList } from '../question-type/multiple-choice/multi-one';
import { createTableCompletion } from '../question-type/table-completion';

export const createQuestionGroup = async ({
  formData,
  partId
}: {
  formData: QuestionGroupSchemaType;
  partId: string;
}) => {
  const { numberColumns, numberRows, ...rest } = formData;
  if (formData.type === 'TABLE_COMPLETION') {
    if (!numberColumns || !numberRows) {
      throw new Error('Missing number Col, Row');
    }
  }
  const part = await db.part.findUnique({
    where: { id: partId },
    select: { assessmentId: true }
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
      partId
    }
  });
  switch (formData.type) {
    case 'MULTIPLE_CHOICE_ONE_ANSWER':
      await createMultiOneList(questionGroup, part.assessmentId);
      break;
    case 'MULTIPLE_CHOICE_MORE_ANSWERS':
      await createMultiMoreList({
        questionGroupId: questionGroup.id
      });
      break;
    case 'IDENTIFYING_INFORMATION':
      await createIdentifyInfoList(questionGroup, part.assessmentId);
      break;
    case 'COMPLETION':
      await createCompletion(questionGroup, part.assessmentId);
      break;
    case 'TABLE_COMPLETION':
      await createTableCompletion({
        questionGroup: questionGroup,
        assessmentId: part.assessmentId,
        numberColumns: formData.numberColumns,
        numberRows: formData.numberRows
      });
      break;
    case 'MATCHING':
      await createMatching({
        questionGroupId: questionGroup.id
      });
      break;
    default:
      throw new Error(`Unsupported question group type: ${formData.type}`);
  }
  revalidatePath(`/assessments/${part.assessmentId}`);
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

export const deleteQuestionGroup = async ({ id }: { id: string }) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: { id },
    select: { part: { select: { assessmentId: true } } }
  });
  if (!questionGroup) {
    throw new Error('Question Group Not Found');
  }

  await db.questionGroup.delete({
    where: { id }
  });

  revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
};
