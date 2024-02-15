'use server';

import { db } from '@/lib/db';

export const createMultiMoreList = async ({
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
    throw new Error('QUestion Group Id not found');
  }

  const totalChoices = 4;
  questionGroup.questions.map(async (question) => {
    await db.multipleChoiceMoreAnswers.create({
      data: {
        questionGroupId,
        title: 'example',
        questionId: question.id,
        expectedAnswers: ['Option 1', 'Option 2'],
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

// export const updateMultiMore = async ({
//   title,
//   expectedAnswers,
//   id
// }: {
//   title: string;
//   expectedAnswers: string[];
//   id: number;
// }) => {
//   try {
//     const multiMoreAnswers = await db.multipleChoiceMoreAnswers.update({
//       where: {
//         id
//       },
//       data: {
//         title,
//         expectedAnswers
//       }
//     });

//     return multiMoreAnswers;
//   } catch (error) {
//     console.error('Error updating multipleChoice:', error);
//     return null;
//   }
// };
