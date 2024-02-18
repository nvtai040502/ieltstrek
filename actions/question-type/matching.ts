'use server';

import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { FormattedText } from '@/types/text-editor';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';

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

  const matchingChoiceGroup = await db.matchingChoiceGroup.create({
    data: {
      title: 'List of Heading',
      questionGroupId: questionGroup.id,
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
  await db.matching.create({
    data: {
      questionGroupId: questionGroup.id,
      paragraph: JSON.stringify(matchingInitial),
      matchingChoiceGroupId: matchingChoiceGroup.id
    }
  });
};

// export const updateMatchingSentence = async ({
//   id,
//   paragraph
// }: {
//   id: number;
//   paragraph: string;
// }) => {
//   const matchingSentence = await db.matchingSentence.findUnique({
//     where: {
//       id
//     }
//   });
//   if (!matchingSentence) {
//     throw new Error('Id not found');
//   }

//   await db.matchingSentence.update({
//     where: {
//       id
//     },
//     data: {
//       paragraph
//     }
//   });

//   // revalidatePath(`/assessments/${questionGroup.part.assessmentId}`);
//   return;
// };
