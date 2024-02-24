"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/lib/validations/auth";
import { currentUser } from "../auth/user";
import { getUserByEmail, getUserById } from "./user";
import { generateVerificationToken } from "./verification-token";
import { sendVerificationEmail } from "../auth/send-email";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }

    const verificationToken = await generateVerificationToken(
      values.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(
      values.newPassword,
      10,
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  });

  

  return { success: "Settings Updated!" }
}