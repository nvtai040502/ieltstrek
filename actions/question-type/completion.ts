'use server';

import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';

export const createCompletion = async (
  questionGroup: QuestionGroup,
  assessmentId: string
) => {
  const totalQuestions = getTotalQuestions(questionGroup);
  const completionInitial: Descendant[] = Array.from(
    {
      length: totalQuestions
    },
    (_, i) => ({
      type: 'paragraph',
      children: [
        { text: `This is note completion example` },
        {
          type: 'completionBlank',
          children: [{ text: '' }],
          questionNumber: questionGroup.startQuestionNumber + i
        },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a!' }
      ]
    })
  );
  await db.completion.create({
    data: {
      questionGroupId: questionGroup.id,
      paragraph: JSON.stringify(completionInitial),
      questions: {
        createMany: {
          data: Array.from({ length: totalQuestions }).map((_, i) => ({
            questionGroupId: questionGroup.id,
            questionNumber: questionGroup.startQuestionNumber + i,
            correctAnswer: 'hello',
            partId: questionGroup.partId,
            assessmentId
          }))
        }
      }
    }
  });

  return;
};

// export const updateNoteCompletion = async ({
//   id,
//   paragraph,
// }: {
//   id: number;
//   paragraph: string;
// }): Promise<boolean> => {
//   try {
//     await db.noteCompletion.update({
//       where: {
//         id,
//       },
//       data: {
//         paragraph,
//       },
//     });

//     return true;
//   } catch (error) {
//     console.error("Error updating note completion:", error);
//     return false;
//   }
// };
