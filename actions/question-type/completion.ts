'use server';

import { revalidatePath } from 'next/cache';
import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';

export const createCompletion = async (
  questionGroup: QuestionGroup,
  assessmentId: string
) => {
  const totalQuestions = getTotalQuestions(questionGroup);
  const completionInitial: Descendant[] = Array.from(
    {
      length: totalQuestions
    },
    (_, i) => ({
      type: 'paragraph',
      children: [
        { text: `This is note completion example` },
        {
          type: 'blank',
          children: [{ text: ' hello' }],
          questionNumber: questionGroup.startQuestionNumber + i
        },
        { text: ' rich', bold: true },
        { text: ' text, ' },
        { text: ' much', italic: true },
        { text: ' better than a!' }
      ]
    })
  );
  await db.completion.create({
    data: {
      questionGroupId: questionGroup.id,
      paragraph: JSON.stringify(completionInitial),
      questions: {
        createMany: {
          data: Array.from({ length: totalQuestions }).map((_, i) => ({
            questionGroupId: questionGroup.id,
            questionNumber: questionGroup.startQuestionNumber + i,
            correctAnswer: 'hello',
            partId: questionGroup.partId,
            assessmentId
          }))
        }
      }
    }
  });

  return;
};

export const updateCompletion = async ({
  id,
  paragraph
}: {
  id: string;
  paragraph: string;
}) => {
  const completion = await db.completion.findUnique({
    where: { id },
    select: {
      questionGroup: { select: { part: { select: { assessmentId: true } } } }
    }
  });
  if (!completion) {
    throw new Error('Completion Id not found');
  }

  await db.completion.update({
    where: {
      id
    },
    data: {
      paragraph
    }
  });

  revalidatePath(`/assessments/${completion.questionGroup.part.assessmentId}`);
};
