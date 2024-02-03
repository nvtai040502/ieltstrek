"use server";
import { db } from "@/lib/db";
import { createQuestion } from "./question";
import { IdentifyingInformationAnswer } from "@prisma/client";

interface CreateIdentifyingInformationProps {
  questionGroupId: number;
  startQuestionNumber: number;
  endQuestionNumber: number;
  partId: number;
  assessmentId: number;
}

export const createIdentifyingInformation = async ({
  questionGroupId,
  startQuestionNumber,
  endQuestionNumber,
  partId,
  assessmentId,
}: CreateIdentifyingInformationProps): Promise<boolean> => {
  try {
    const questions = await Promise.all(
      Array.from(
        { length: endQuestionNumber - startQuestionNumber + 1 },
        async (_, i) => {
          const question = await createQuestion({
            partId,
            assessmentId,
            questionNumber: startQuestionNumber + i,
          });

          if (!question) {
            throw new Error("Error creating question");
          }

          return question;
        }
      )
    );

    await db.identifyingInformation.create({
      data: {
        questionGroupId,
        identifyingInformationItems: {
          createMany: {
            data: questions.map((question) => ({
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
        title
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating identifyingInformation:", error);
    return false;
  }
};