'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/lib/db';
import { AssessmentSchema } from '@/lib/validations/text-exam';

export const createAssessment = async ({
  formData
}: {
  formData: z.infer<typeof AssessmentSchema>;
}) => {
  const assessment = await db.assessment.create({
    data: {
      ...formData,
      totalQuestions: 40,
      duration: 3600,
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
export async function getAssessmentIdByQuestionGroupId(
  questionGroupId: string
) {
  const questionGroup = await db.questionGroup.findUnique({
    where: {
      id: questionGroupId
    },
    select: {
      part: {
        select: {
          assessmentId: true
        }
      }
    }
  });

  if (!questionGroup) {
    throw new Error('Question Group Id Not found');
  }

  return questionGroup.part.assessmentId;
}

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
export async function publicAssessment(assessmentId: string) {
  await db.assessment.update({
    where: {
      id: assessmentId
    },
    data: {
      isPublic: true
    }
  });
}
