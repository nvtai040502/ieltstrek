"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/validations/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!"}
  }
  
  const { email, password } = validatedFields.data
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