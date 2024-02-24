'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ChoiceData } from '@/global/edit-context';
import { db } from '@/lib/db';
import { ChoiceSchema } from '@/lib/validations/question-type';

export const getChoiceById = async (id: string) => {
  const choice = await db.choice.findUnique({ where: { id } });
  if (!choice) {
    throw new Error('Choice Id not found');
  }
  return choice;
};
export const updateChoice = async ({
  formData,
  choiceData
}: {
  formData: z.infer<typeof ChoiceSchema>;
  choiceData: ChoiceData;
}) => {
  const { type, choice } = choiceData;

  if (type === 'MULTI_ONE') {
    const { multiOneId } = choiceData;

    const multiOne = await db.multipleChoiceOneAnswer.findUnique({
      where: { id: multiOneId },
      select: { question: { select: { assessmentId: true } } }
    });

    if (!multiOne) {
      throw new Error('MultiOne ID not found');
    }

    await db.choice.update({
      where: { id: choice.id },
      data: { ...formData }
    });
    const { isCorrect } = formData;
    if (isCorrect) {
      await db.choice.updateMany({
        where: {
          NOT: { id: choice.id },
          multiOneId
        },
        data: { isCorrect: false }
      });
    }

    revalidatePath(`/assessments/${multiOne.question.assessmentId}`);
  } else if (type === 'MULTI_MORE') {
    const { multiMoreId } = choiceData;

    const multiMore = await db.multipleChoiceMoreAnswers.findUnique({
      where: { id: multiMoreId },
      select: { question: { select: { assessmentId: true } } }
    });

    if (!multiMore) {
      throw new Error('MultiMore ID not found');
    }

    await db.choice.update({
      where: { id: choice.id },
      data: { ...formData }
    });

    revalidatePath(`/assessments/${multiMore.question.assessmentId}`);
  }
};
