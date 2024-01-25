"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/validations/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!"}
  }
  return { success: "Email Sent!" }
}