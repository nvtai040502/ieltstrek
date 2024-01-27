"use server"

import { db } from "@/lib/db";

export const createCambridgeBook = async (version: number, imageCover?: string) => {
  try {
    const cambridgeBook = await db.cambridgeBook.create({
      data: {
        version,
        imageCover,
      },
    });

    return cambridgeBook;
  } catch (error) {
    console.error("Error creating Cambridge Book:", error);
    return null;
  }
};
