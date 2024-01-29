"use server"

import { db } from "@/lib/db";
import { Passage, QuestionType} from "@prisma/client";

export const createQuestion = async ({
  content,
  headerForItems,
  scorableItemsCount,
  type,
  partId
}: {
  content: string
  headerForItems?: string,
  type: QuestionType,
  scorableItemsCount: number
  partId: string
}) => {
  try {
    const question = await db.question.create({
      data: {
        content,
        headerForItems,
        scorableItemsCount,
        type,
        partId
      },
    });

    return question;
  } catch (error) {
    console.error("Error creating question:", error);
    return null;
  }
};

// export const updateQuestion = async ({
//   title,
//   id,
//   description,
// }: {
//   title?: string
//   description?: string
//   id: string
// }) => {
//   try {
//     const question = await db.question.update({
//       where: {
//         id
//       },
//       data: {
//         title,
//         decription: description,
        
//       },
//     });

//     return question;
//   } catch (error) {
//     console.error("Error updating question:", error);
//     return null;
//   }
// };
