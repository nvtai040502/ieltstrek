'use server';

import { revalidatePath } from 'next/cache';
import { IdentifyChoice, QuestionGroup } from '@prisma/client';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';
import { IdentifyInfoSchema } from '@/lib/validations/question-type';

export const createIdentifyInfoList = async (
  questionGroup: QuestionGroup,
  assessmentId: string
) => {
  const totalQuestions = getTotalQuestions(questionGroup);
  Array.from({ length: totalQuestions }).map(
    async (_, questionIndex) =>
      await db.question.create({
        data: {
          questionNumber: questionGroup.startQuestionNumber + questionIndex,
          questionGroupId: questionGroup.id,
          correctAnswer: IdentifyChoice.TRUE,
          partId: questionGroup.partId,
          assessmentId: assessmentId,
          identifyInfo: {
            create: {
              questionGroupId: questionGroup.id,
              title: 'This is title for identify information question',
              choiceCorrect: 'TRUE'
            }
          }
        }
      })
  );
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
