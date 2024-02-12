"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAssessment = async ({ name }: { name: string }) => {
  const assessment = await db.assessment.create({
    data: {
      name,
      totalQuestions: 40,
      parts: {
        create: Array.from({ length: 3 }).map((_, i) => ({
          title: "Part Title",
          description: "Part Description",
          order: i,
        })),
      },
    },
  });
  redirect(`/assessments/${assessment.id}`);
};
