'use server';

import { revalidatePath } from 'next/cache';
import { QuestionGroup } from '@prisma/client';
import { z } from 'zod';
import { CHOICE_OPTIONS } from '@/config/constants';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';
import { MultiOneSchema } from '@/lib/validations/question-type';

export const createMultiOneList = async (
  questionGroup: QuestionGroup,
  assessmentId: string
) => {
  const totalQuestions = getTotalQuestions(questionGroup);
  Array.from({ length: totalQuestions }).map(
    async (_, questionIndex) =>
      await db.question.create({
        data: {
          questionNumber: questionGroup.startQuestionNumber + questionIndex,
          questionGroupId: questionGroup.id,
          correctAnswer: CHOICE_OPTIONS[0],
          partId: questionGroup.partId,
          assessmentId: assessmentId,
          multiOne: {
            create: {
              title: 'This is title for multi one question',
              questionGroupId: questionGroup.id,
              choices: {
                createMany: {
                  data: Array.from({ length: CHOICE_OPTIONS.length }).map(
                    (_, choiceIndex) => ({
                      content: `Option ${choiceIndex + 1}`,
                      order: choiceIndex,
                      isCorrect: choiceIndex === 0 ? true : false
                    })
                  )
                }
              }
            }
          }
        }
      })
  );
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
