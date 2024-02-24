'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export const createOrUpdateResult = async ({
  score,
  timeSpent,
  totalCorrectAnswers,
  assessmentId
}: {
  score: number;
  assessmentId: string;
  timeSpent: number;
  totalCorrectAnswers: number;
}) => {
  const result = await db.result.findUnique({
    where: {
      assessmentId
    }
  });

  if (result) {
    await db.result.update({
      where: { assessmentId },
      data: {
        timeSpent,
        score,
        totalCorrectAnswers
      }
    });
  } else {
    await db.result.create({
      data: {
        timeSpent,
        score,
        totalCorrectAnswers,
        assessmentId
      }
    });
  }

  revalidatePath(`/score/${assessmentId}`);
  redirect(`/score/${assessmentId}`);
};
