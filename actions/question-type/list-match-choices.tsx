'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { ListMatchingChoicesSchema } from '@/lib/validations/question-type';

export const updateMatchingChoiceGroup = async ({
  id,
  formData
}: {
  formData: z.infer<typeof ListMatchingChoicesSchema>;
  id: string;
}) => {
  const { title, matchingChoices } = formData;
  const matchingChoiceGroup = await db.matchingChoiceGroup.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      matching: true,
      questionGroup: {
        select: {
          id: true,
          questions: {
            orderBy: {
              questionNumber: 'asc'
            }
          },
          part: {
            select: {
              assessmentId: true
            }
          }
        }
      },
      matchingChoiceList: {
        orderBy: {
          question: {
            questionNumber: 'asc'
          }
        }
      }
    }
  });

  if (!matchingChoiceGroup) {
    throw new Error('Question Group Id not found');
  }

  if (
    formData.matchingChoices.length !==
    matchingChoiceGroup.matchingChoiceList.length
  ) {
    const matchingId = matchingChoiceGroup?.matching?.id;
    if (!matchingId) {
      throw new Error('Matching Sentence Id is missing');
    }
    await db.matchingChoiceGroup.delete({
      where: {
        id
      }
    });

    await db.matchingChoiceGroup.create({
      data: {
        title: formData.title,
        questionGroupId: matchingChoiceGroup.questionGroup.id,
        matching: {
          connect: {
            id: matchingId
          }
        },
        matchingChoiceList: {
          createMany: {
            data: formData.matchingChoices.map((content, i) => ({
              content,
              questionId:
                i < matchingChoiceGroup.questionGroup.questions.length - 1
                  ? matchingChoiceGroup.questionGroup.questions[i].id
                  : null
            }))
          }
        }
      }
    });
  } else {
    await db.matchingChoiceGroup.update({
      where: {
        id: matchingChoiceGroup.id
      },
      data: {
        title,
        matchingChoiceList: {
          update: matchingChoiceGroup.matchingChoiceList.map(
            (matchingChoice, i) => ({
              where: {
                id: matchingChoice.id
              },
              data: {
                content: matchingChoices[i]
              }
            })
          )
        }
      }
    });
  }

  revalidatePath(
    `/assessments/${matchingChoiceGroup.questionGroup.part.assessmentId}`
  );
  return;
};
