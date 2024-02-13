'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { Descendant } from 'slate';

export const createMatching = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: { id: questionGroupId },
    include: {
      questions: true
    }
  });

  if (!questionGroup) {
    throw new Error('Question Group Id not found');
  }

  const matchingInitial: Descendant[] = Array.from(
    {
      length:
        questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1
    },
    (_, i) => ({
      type: 'paragraph',
      children: [
        { text: 'This is matching sentence example' },
        {
          type: 'blank',
          children: [{ text: 'editable button' }]
        },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a!' }
      ]
    })
  );

  const totalQuestions = questionGroup.questions.length;
  const totalFakeChoices = 3;
  const totalChoicesCreated = totalFakeChoices + totalQuestions;

  const matchingChoiceGroup = await db.matchingChoiceGroup.create({
    data: {
      title: 'List of Heading',
      questionGroupId,
      matchingChoiceList: {
        createMany: {
          data: Array.from({ length: totalChoicesCreated }).map((_, i) => ({
            content:
              'This is a sentence example for heading choice so that can drag and drop to the answer',
            questionId:
              i < totalQuestions - 1 ? questionGroup.questions[i].id : null
          }))
        }
      }
    }
  });
  await db.matching.create({
    data: {
      questionGroupId,
      paragraph: JSON.stringify(matchingInitial),
      matchingChoiceGroupId: matchingChoiceGroup.id
    }
  });

  return;
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
