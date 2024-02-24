'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { MultiMoreSchema } from '@/lib/validations/question-type';

export const createMultiMoreList = async ({
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
    throw new Error('QUestion Group Id not found');
  }

  const totalChoices = 4;
  questionGroup.questions.map(async (question) => {
    await db.multipleChoiceMoreAnswers.create({
      data: {
        questionGroupId,
        title: 'example',
        questionId: question.id,
        expectedAnswers: ['Option 1', 'Option 2'],
        choices: {
          createMany: {
            data: Array.from({ length: totalChoices }).map((_, i) => ({
              content: `Option ${i + 1}`,
              order: i,
              isCorrect: i < 2 ? true : false
            }))
          }
        }
      }
    });
  });

  return;
};
export const updateMultiMore = async ({
  formData,
  id
}: {
  formData: z.infer<typeof MultiMoreSchema>;
  id: string;
}) => {
  const { title, choiceIdList } = formData;

  const multiMore = await db.multipleChoiceMoreAnswers.findUnique({
    where: { id },
    select: { question: { select: { assessmentId: true } } }
  });

  if (!multiMore) {
    throw new Error('MultiMore ID not found');
  }

  await db.multipleChoiceMoreAnswers.update({
    where: { id },
    data: {
      title,
      choices: {
        updateMany: {
          where: {
            id: { in: choiceIdList }
          },
          data: {
            isCorrect: true
          }
        }
      }
    }
  });

  await db.choice.updateMany({
    where: {
      NOT: { id: { in: choiceIdList } },
      multiMoreId: id
    },
    data: { isCorrect: false }
  });

  revalidatePath(`/assessments/${multiMore.question.assessmentId}`);
};
