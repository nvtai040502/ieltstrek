'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { PartSchema } from '@/lib/validations/text-exam';
import { z } from 'zod';

export const updatePart = async ({
  formData,
  id
}: {
  formData: z.infer<typeof PartSchema>;
  id: string;
}) => {
  const part = await db.part.findUnique({
    where: {
      id
    },
    select: {
      assessmentId: true
    }
  });
  if (!part) {
    throw new Error('Part Id not found');
  }
  await db.part.update({
    where: {
      id
    },
    data: {
      ...formData
    }
  });
  revalidatePath(`/assessments/${part.assessmentId}`);
};
