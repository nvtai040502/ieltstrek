"use server"

import { db } from "@/lib/db";
import { PartExtended } from "@/types/db";
import { Part } from "@prisma/client";
export const updatePart = async ({
  title,
  description,
  id
}: {
  title: string
  description: string,
  id: number,
}) => {
  try {
    const part = await db.part.update({
      where: {
        id
      },
      data: {
        title,
        description,
      },
    });

    return part;
  } catch (error) {
    console.error("Error updating Assessment:", error);
    return null;
  }
};


export const createPartTemplate = async ({
  index,
  startQuestionNumber,
  endQuestionNumber,
  assessmentId,
}: {
  assessmentId: number;
  index: number;
  startQuestionNumber: number,
  endQuestionNumber: number,
}):Promise<PartExtended | undefined> => {
  try {
    const partExtend = await db.part.create({
      data: {
        title: `Part ${index+1}`,
        description: "Description",
        assessmentId,
        passage: {
          create: {
            title: "Hello",
            description: "hello",
            content: "hello"
          }
        },
        questionGroups: {
          create: {
            title: "hello",
            description: "hello",
            startQuestionNumber,
            endQuestionNumber,
            type: "MULTIPLE_CHOICE",
            multipleChoiceArray: {
              cr
            }
          }
        }
      }
    })
    return ;
  } catch (error) {
    console.error("Error creating assessment parts:", error);
    return undefined;
  }
};

export const createParts = async ({
  assessmentId,
  numberOfPartsToCreate,
}: {
  assessmentId: number;
  numberOfPartsToCreate: number;
}) => {
  try {
    Array.from({ length: numberOfPartsToCreate }).map((_, i) => {
      
    });
    return true;
  } catch (error) {
    console.error("Error creating assessment parts:", error);
    return false;
  }
};