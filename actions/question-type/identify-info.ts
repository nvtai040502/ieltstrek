'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { IdentifyInfoSchema } from '@/lib/validations/question-type';

export const createIdentifyInfoList = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: {
      id: questionGroupId
    },
    select: {
      questions: {
        select: {
          id: true
        }
      }
    }
  });
  if (!questionGroup) {
    throw new Error('Question Group Id not found');
  }

  questionGroup.questions.map(async (question) => {
    await db.identifyingInformation.create({
      data: {
        questionGroupId,
        title: 'This is title for identify information question',
        questionId: question.id,
        choiceCorrect: 'TRUE'
      }
    });
  });
};
export const updateIdentifyInfo = async ({
  formData,
  id
}: {
  formData: z.infer<typeof IdentifyInfoSchema>;
  id: string;
}) => {
  const identifyInfo = await db.identifyingInformation.findUnique({
    where: { id },
    select: { question: { select: { assessmentId: true } } }
  });
  if (!identifyInfo) {
    throw new Error('IdentifyInfo Id not found');
  }

  await db.identifyingInformation.update({
    where: { id },
    data: {
      ...formData
    }
  });
  revalidatePath(`/assessments/${identifyInfo.question.assessmentId}`);
};
