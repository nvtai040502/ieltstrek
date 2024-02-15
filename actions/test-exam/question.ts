'use server';

import { QuestionType } from '@prisma/client';
import { db } from '@/lib/db';

export const getCorrectAnswerByQuestionId = async ({
  questionId,
  questionType
}: {
  questionId: string;
  questionType: QuestionType;
}) => {
  if (questionType === 'IDENTIFYING_INFORMATION') {
    const question = await db.question.findUnique({
      where: { id: questionId },
      include: {
        identifyInfo: true
      }
    });
    if (!question || !question.identifyInfo) {
      throw new Error('Question Id Not found');
    }
    return question.identifyInfo.choiceCorrect;
  }
};
