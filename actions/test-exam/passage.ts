'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { PassageSchema } from '@/lib/validations/text-exam';
import { getAssessmentIdByPartId } from './assessment';

export const createPassageSimple = async ({
  title,
  partId
}: {
  title: string;
  partId: string;
}) => {
  await db.passage.create({
    data: {
      title,
      content: 'This is example for simple passage',
      partId,
      description: 'this is description',
      type: 'PASSAGE_SIMPLE'
    }
  });
};
export const createPassageMultiHeading = async ({
  title,
  partId
}: {
  title: string;
  partId: string;
}) => {
  const numberHeading = 5;
  await db.passage.create({
    data: {
      title,
      content: 'This is example for simple passage',
      partId,
      description: 'this is description',
      type: 'PASSAGE_MULTI_HEADING',
      passageHeadingList: {
        createMany: {
          data: Array.from({ length: numberHeading }).map((_, i) => ({
            title: `Title for Heading ${i + 1}`,
            content: 'this is Example for create multiple heading',
            order: i
          }))
        }
      }
    }
  });
};
export const createPassage = async ({
  formData,
  partId
}: {
  formData: z.infer<typeof PassageSchema>;
  partId: string;
}) => {
  const assessmentId = await getAssessmentIdByPartId(partId);

  const { type, title } = formData;
  if (type === 'PASSAGE_SIMPLE') {
    await createPassageSimple({ title, partId });
  }
  if (type === 'PASSAGE_MULTI_HEADING') {
    await createPassageMultiHeading({ title, partId });
  }
  revalidatePath(`/assessments/${assessmentId}`);
};

// export const updatePassageMultiHeading = async ({
//   title,
//   content,
//   id
// }: {
//   title: string;
//   content: string;
//   id: number;
// }) => {
//   const passageMultiHeading = await db.passageMultiHeading.findUnique({
//     where: {
//       id
//     },
//     select: {
//       passage: {
//         select: {
//           part: {
//             select: {
//               assessmentId: true
//             }
//           }
//         }
//       }
//     }
//   });
//   if (!passageMultiHeading) {
//     throw new Error('Id not found, please try again.');
//   }
//   await db.passageMultiHeading.update({
//     where: {
//       id
//     },
//     data: {
//       title,
//       content
//     }
//   });
//   revalidatePath(
//     `/assessments/${passageMultiHeading.passage.part.assessmentId}`
//   );
//   return;
// };

export const updatePassage = async ({
  formData,
  id
}: {
  formData: z.infer<typeof PassageSchema>;
  id: string;
}) => {
  const passage = await db.passage.findUnique({
    where: { id },
    select: { part: { select: { assessmentId: true } } }
  });
  if (!passage) {
    throw new Error('Passage Id Not Found');
  }
  await db.passage.update({
    where: { id },
    data: { ...formData }
  });
  revalidatePath(`/assessments/${passage.part.assessmentId}`);
};
