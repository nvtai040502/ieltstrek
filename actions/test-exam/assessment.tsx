"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAssessment = async ({ name }: { name: string }) => {
  const assessment = await db.assessment.create({
    data: {
      name,
      totalQuestions: 40,
    },
  });
  redirect(`/assessments/${assessment.id}`);
};
