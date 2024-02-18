'use server';

import { revalidatePath } from 'next/cache';
import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { z } from 'zod';
import { FormattedText } from '@/types/text-editor';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';
import { MatchingChoiceListSchema } from '@/lib/validations/question-type';

export const createMatching = async (
  questionGroup: QuestionGroup,
  assessmentId: string
) => {
  const totalQuestions = getTotalQuestions(questionGroup);
  const matchingInitial: Descendant[] = Array.from(
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

  const totalFakeChoices = 3;
  const totalChoicesCreated = totalFakeChoices + totalQuestions;

  await db.matching.create({
    data: {
      questionGroupId: questionGroup.id,
      paragraph: JSON.stringify(matchingInitial),
      titleForQuestion: 'List of Heading',
      matchingChoiceList: {
        create: Array.from({ length: totalChoicesCreated }).map((_, i) => ({
          content: `This is an example sentence number ${i + 1}`,
          // Ensure that question is created only if i < totalQuestions
          ...(i < totalQuestions && {
            question: {
              create: {
                questionNumber: questionGroup.startQuestionNumber + i,
                correctAnswer: `This is an example sentence number ${i + 1}`,
                questionGroupId: questionGroup.id,
                partId: questionGroup.partId,
                assessmentId
              }
            }
          })
        }))
      }
    }
  });
};

export const updateMatchingParagraph = async ({
  id,
  paragraph
}: {
  id: string;
  paragraph: string;
}) => {
  const matching = await db.matching.findUnique({
    where: { id },
    select: {
      questionGroup: { select: { part: { select: { assessmentId: true } } } }
    }
  });
  if (!matching) {
    throw new Error('matching Id not found');
  }
  await db.matching.update({
    where: {
      id
    },
    data: {
      paragraph
    }
  });

  revalidatePath(`/assessments/${matching.questionGroup.part.assessmentId}`);
};

export const updateMatchingChoiceList = async ({
  id,
  formData
}: {
  id: string;
  formData: z.infer<typeof MatchingChoiceListSchema>;
}) => {
  const { titleForQuestion, matchingChoiceList } = formData;
  const matching = await db.matching.findUnique({
    where: { id },
    include: {
      matchingChoiceList: {
        orderBy: { question: { questionNumber: 'asc' } }
      },
      questionGroup: {
        include: {
          part: { select: { assessmentId: true } },
          questions: { orderBy: { questionNumber: 'asc' } }
        }
      }
    }
  });
  if (!matching) {
    throw new Error('matching Id not found');
  }

  if (matchingChoiceList.length !== matching.matchingChoiceList.length) {
    await db.matching.delete({
      where: { id }
    });

    await db.matching.create({
      data: {
        titleForQuestion,
        questionGroupId: matching.questionGroup.id,
        paragraph: matching.paragraph,
        matchingChoiceList: {
          createMany: {
            data: matchingChoiceList.map((content, i) => ({
              content,
              questionId:
                i < matching.questionGroup.questions.length - 1
                  ? matching.questionGroup.questions[i].id
                  : null
            }))
          }
        }
      }
    });
  } else {
    await db.matching.update({
      where: { id: matching.id },
      data: {
        titleForQuestion,
        matchingChoiceList: {
          update: matching.matchingChoiceList.map((matchingChoice, i) => ({
            where: {
              id: matchingChoice.id
            },
            data: {
              content: matchingChoiceList[i]
            }
          }))
        }
      }
    });
  }

  revalidatePath(`/assessments/${matching.questionGroup.part.assessmentId}`);
};
