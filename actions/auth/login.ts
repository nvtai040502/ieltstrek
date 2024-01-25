"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/validations/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../database/user";
import { generateVerificationToken } from "../database/verification-token";
import { sendVerificationEmail } from "./send-email";

export const loginCredentials = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!"}
  }
  
  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
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