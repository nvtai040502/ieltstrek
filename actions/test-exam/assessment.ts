'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { AssessmentSchema } from '@/lib/validations/text-exam';
import { z } from 'zod';

export const createAssessment = async ({
  formData
}: {
  formData: z.infer<typeof AssessmentSchema>;
}) => {
  const assessment = await db.assessment.create({
    data: {
      ...formData,
      totalQuestions: 40,
      parts: {
        create: Array.from({ length: 3 }).map((_, i) => ({
          title: `Part ${i + 1}`,
          description: 'Part Description',
          order: i
        }))
      }
    }
  });
  redirect(`/assessments/${assessment.id}`);
};

export async function getAssessmentIdByPartId(partId: string) {
  const part = await db.part.findUnique({
    where: {
      id: partId
    },
    select: {
      assessmentId: true
    }
  });

  if (!part) {
    throw new Error('Part Id Not found');
  }

  return part.assessmentId;
}
