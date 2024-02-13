'use server';

// import { noteCompletionInitial } from "@/config/template/note-completion";
import { db } from '@/lib/db';
import { Descendant } from 'slate';

export const createNoteCompletion = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const questionGroup = await db.questionGroup.findUnique({
    where: {
      id: questionGroupId
    },
    include: {
      questions: true
    }
  });
  if (!questionGroup) {
    throw new Error('Id not found');
  }
  const noteCompletionInitial: Descendant[] = Array.from(
    {
      length:
        questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1
    },
    (_, i) => ({
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        {
          text: '<textarea>',
          code: true,
          questionNumber: questionGroup.startQuestionNumber + i
        },
        { text: '!' }
      ]
    })
  );
  await db.completion.create({
    data: {
      questionGroupId,
      paragraph: JSON.stringify(noteCompletionInitial),
      blanks: {
        createMany: {
          data: questionGroup.questions.map((question) => ({
            expectedAnswer: 'is',
            questionId: question.id
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
