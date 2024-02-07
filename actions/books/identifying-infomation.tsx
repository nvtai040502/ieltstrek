"use server";
import { db } from "@/lib/db";
import { IdentifyingInformationAnswer } from "@prisma/client";

export const createIdentifyingInformation = async ({
  questionGroupId,
}: {
  questionGroupId: number;
}): Promise<boolean> => {
  try {
    const questionGroup = await db.questionGroup.findUnique({
      where: {
        id: questionGroupId,
      },
      select: {
        questions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!questionGroup) {
      throw new Error("QUestion Group Id not found");
    }

    await db.identifyingInformation.create({
      data: {
        questionGroupId,
        identifyingInformationItems: {
          createMany: {
            data: questionGroup.questions.map((question) => ({
              title:
                "This is an example for creating a True/False/NotGiven question",
              expectedAnswer: "TRUE",
              questionId: question.id,
            })),
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating identifyingInformation:", error);
    return false;
  }
};

export const updateIdentifyingInformationItem = async ({
  id,
  expectedAnswer,
  explanation,
  title,
}: {
  id: number;
  expectedAnswer: IdentifyingInformationAnswer;
  explanation?: string;
  title: string;
}): Promise<boolean> => {
  try {
    await db.identifyingInformationItem.update({
      where: { id },
      data: {
        expectedAnswer,
        explanation,
        title,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating identifyingInformation:", error);
    return false;
  }
};
