"use server"

import { db } from "@/lib/db";

export const createCambridgeBook = async (name: string, imageCover?: string) => {
  try {
    const cambridgeBook = await db.cambridgeBook.create({
      data: {
        name,
        imageCover,
      },
    });

    return cambridgeBook;
  } catch (error) {
    console.error("Error creating Cambridge Book:", error);
    return null;
  }
};
