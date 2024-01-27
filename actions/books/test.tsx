"use server"

import { db } from "@/lib/db";
import { SessionType, Test } from "@prisma/client";

export const createTest = async ({
  bookImageCover,
  bookName,
  testNumber
}: Pick<Test,|"bookImageCover" |"bookName" |"testNumber">) => {
  try {
    const test = await db.test.create({
      data: {
        bookImageCover,
        bookName,
        testNumber
      },
    });

    return test;
  } catch (error) {
    console.error("Error creating Test:", error);
    return null;
  }
};
