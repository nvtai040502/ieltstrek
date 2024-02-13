'use server';

import { db } from '@/lib/db';

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
        title: 'example',
        expectedAnswer: 'Option 1',
        questionId: question.id,
        choices: {
          createMany: {
            data: Array.from({ length: totalChoices }).map((_, i) => ({
              content: `Option ${i + 1}`,
              order: i
            }))
          }
        }
      }
    });
  });

  return;
};

// export const updateMultiOne = async ({
//   title,
//   expectedAnswer,
//   id
// }: {
//   title: string;
//   expectedAnswer: string;
//   id: number;
// }) => {
//   try {
//     const multipleChoice = await db.multipleChoice.update({
//       where: {
//         id
//       },
//       data: {
//         title,
//         expectedAnswer
//       }
//     });

//     return multipleChoice;
//   } catch (error) {
//     console.error('Error updating multipleChoice:', error);
//     return null;
//   }
// };
