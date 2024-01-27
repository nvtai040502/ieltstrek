"use server"

import { db } from "@/lib/db";
import { SessionType } from "@prisma/client";

export const createPart = async (name: string, testId: string) => {
  try {
    const part = await db.part.create({
      data: {
        name,
        testId
      },
    });

    return part;
  } catch (error) {
    console.error("Error creating Part:", error);
    return null;
  }
};
