'use server';

import { db } from '@/lib/db';

export const createIdentifyInfoList = async ({
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
    await db.identifyingInformation.create({
      data: {
        questionGroupId,
        title: 'This is title for identify information question',
        questionId: question.id,
        choiceCorrect: 'TRUE'
      }
    });
  });
};
