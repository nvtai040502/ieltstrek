'use server';

import { QuestionGroup } from '@prisma/client';
import { Descendant } from 'slate';
import { FormattedText } from '@/types/text-editor';
import { db } from '@/lib/db';
import { getTotalQuestions } from '@/lib/utils';

export const createTableCompletion = async ({
  questionGroup,
  assessmentId,
  numberColumns,
  numberRows
}: {
  questionGroup: QuestionGroup;
  assessmentId: string;
  numberColumns: number;
  numberRows: number;
}) => {
  const totalQuestions = getTotalQuestions(questionGroup);

  let blankCount = 0;
  const tableCompleteInitial: Descendant[] = [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:'
        }
      ]
    },
    {
      type: 'table',
      children: Array.from(
        {
          length: numberRows
        },
        () => ({
          type: 'table-row',
          children: Array.from(
            {
              length: numberColumns
            },
            (_, j) => {
              const isCode = j % 2 !== 0 && blankCount < totalQuestions;
              if (isCode) {
                blankCount++;
              }
              return {
                type: 'table-cell',
                children: [{ text: 'Human', bold: true, code: isCode }]
              };
            }
          )
        })
      ) as any
    }
  ];

  await db.completion.create({
    data: {
      questionGroupId: questionGroup.id,
      paragraph: JSON.stringify(tableCompleteInitial),
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
