'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { MultiOneSchema } from '@/lib/validations/question-type';

export const createMultiOneList = async ({
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
    throw new Error('Question Group Id not found');
  }

  questionGroup.questions.map(async (question) => {
    const totalChoices = 4;
    await db.multipleChoiceOneAnswer.create({
      data: {
        questionGroupId,
        title: 'This is title for multi one question',
        questionId: question.id,
        choices: {
          createMany: {
            data: Array.from({ length: totalChoices }).map((_, i) => ({
              content: `Option ${i + 1}`,
              order: i,
              isCorrect: i === 0 ? true : false
            }))
          }
        }
      }
    });
  });

  return;
};

export const updateMultiOne = async ({
  formData,
  id
}: {
  formData: z.infer<typeof MultiOneSchema>;
  id: string;
}) => {
  const { title, ...rest } = formData;

  // Find the multiOne record
  const multiOne = await db.multipleChoiceOneAnswer.findUnique({
    where: { id },
    select: { question: { select: { assessmentId: true } } }
  });

  // Throw an error if multiOne is not found
  if (!multiOne) {
    throw new Error('MultiOne ID not found');
  }

  // Update the selected choice to be correct
  await db.multipleChoiceOneAnswer.update({
    where: { id },
    data: {
      title,
      choices: {
        update: {
          where: { id: rest.choiceId },
          data: { isCorrect: true }
        }
      }
    }
  });

  // Update other choices to remove the correct flag
  await db.choice.updateMany({
    where: {
      NOT: { id: rest.choiceId },
      multiOneId: id
    },
    data: { isCorrect: false }
  });

  // Revalidate the path
  revalidatePath(`/assessments/${multiOne.question.assessmentId}`);
};
export const isChoiceCorrect = async (choiceId: string) => {
  const choice = await db.choice.findUnique({
    where: {
      id: choiceId
    },
    select: {
      isCorrect: true
    }
  });

  if (!choice) {
    throw new Error('Choice Id not found');
  }

  return choice.isCorrect;
};
