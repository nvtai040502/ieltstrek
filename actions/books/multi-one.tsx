'use server';

import { createQuestion } from './question';
import { db } from '@/lib/db';
import { MultiOneExtended } from '@/types/db';
import { create } from 'domain';

export const createMultiOneArray = async ({
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
    await db.multipleChoice.create({
      data: {
        questionGroupId,
        title: 'example',
        expectedAnswer: 'Option 1',
        questionId: question.id,
        choices: {
          createMany: {
            data: [
              { content: 'Option 1' },
              { content: 'Option 2' },
              { content: 'Option 3' },
              { content: 'Option 4' }
            ]
          }
        }
      }
    });
  });

  return;
};

export const updateMultiOne = async ({
  title,
  expectedAnswer,
  id
}: {
  title: string;
  expectedAnswer: string;
  id: number;
}) => {
  try {
    const multipleChoice = await db.multipleChoice.update({
      where: {
        id
      },
      data: {
        title,
        expectedAnswer
      }
    });

    return multipleChoice;
  } catch (error) {
    console.error('Error updating multipleChoice:', error);
    return null;
  }
};
