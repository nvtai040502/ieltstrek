"use server";

import * as z from "zod";
import { LoginSchema } from "@/lib/validations/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  console.log(values)
}