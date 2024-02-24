"use server";

import * as z from "zod";
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "../database/user";
import { generateVerificationToken } from "../database/verification-token";
import { sendVerificationEmail } from "./send-email";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!"}
  }

  const { email, password, name} = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "Email already in use!"}
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
}