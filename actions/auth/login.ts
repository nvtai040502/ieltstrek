"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/validations/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "../database/user";
import { generateVerificationToken } from "../database/verification-token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "./send-email";
import { generateTwoFactorToken, getTwoFactorTokenByEmail } from "../database/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "../database/two-factor-confirmation";

export const loginCredentials = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!"}
  }
  
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: "Invalid password!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch(e) {
      if (e instanceof AuthError) {
        switch (e.type) {
          case "CredentialsSignin":
            return { error: "Invalid Credials!" }
          default: 
            return { error: "Something went wrong!" }
        }
      }

      throw e
  }
}

export const loginOAuth = async (provider: "google" | "github") => {
  await signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}