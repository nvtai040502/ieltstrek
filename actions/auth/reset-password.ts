"use server";

import { ResetSchema } from "@/lib/validations/auth";
import * as z from "zod";
import { getUserByEmail } from "../database/user";
import { generatePasswordResetToken } from "../database/password-reset-token";
import { sendPasswordResetEmail } from "./send-email";


export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
}