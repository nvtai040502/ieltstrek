'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { Part } from '@prisma/client';

export const updatePart = async ({
  title,
  description,
  id
}: {
  title: string;
  description: string;
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
      title,
      description
    }
  });
  revalidatePath(`/assessments/${part.assessmentId}`);
};
