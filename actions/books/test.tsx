"use server"

import { db } from "@/lib/db";
import { SessionType } from "@prisma/client";

export const createTest = async (number: number, sessonType: SessionType, cambridgeBookId: string) => {
  try {
    const test = await db.test.create({
      data: {
        number,
        sessonType,
        cambridgeBookId
      },
    });

    return test;
  } catch (error) {
    console.error("Error creating Test:", error);
    return null;
  }
};
