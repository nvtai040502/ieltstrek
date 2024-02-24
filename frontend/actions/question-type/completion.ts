'use server';

import { revalidatePath } from 'next/cache';
import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { z } from 'zod';
import { FormattedText } from '@/types/text-editor';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';
import { CompletionAnswerSchema } from '@/lib/validations/question-type';

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
        { text: `This is note completion example ` },
        {
          type: 'blank',
          children: [{ text: ' hello' }],
          questionNumber: questionGroup.startQuestionNumber + i
        },
        { text: ' rich', bold: true },
        { text: ' text, ' },
        { text: ' much', italic: true },
        { text: ' better than a!' }
      ] as FormattedText[]
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
};

export const updateCompletionParagraph = async ({
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

export const updateCompletionAnswers = async ({
  formData,
  id
}: {
  formData: z.infer<typeof CompletionAnswerSchema>;
  id: string;
}) => {
  const completion = await db.completion.findUnique({
    where: { id },
    include: {
      questions: { orderBy: { questionNumber: 'asc' } },
      questionGroup: { select: { part: { select: { assessmentId: true } } } }
    }
  });
  if (!completion) {
    throw new Error('Completion Id not found');
  }
  const { questions } = formData;
  await db.completion.update({
    where: { id },
    data: {
      questions: {
        updateMany: questions.map((question, i) => ({
          where: { id: completion.questions[i].id },
          data: {
            correctAnswer: question.correctAnswer,
            explain: question.explain
          }
        }))
      }
    }
  });
  revalidatePath(`/assessments/${completion.questionGroup.part.assessmentId}`);
};
