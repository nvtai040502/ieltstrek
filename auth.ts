import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./actions/database/user"
export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut
} = NextAuth({
  session: {strategy: "jwt"},
  callbacks: {
    async session({ session, token }) {
      console.log("🚀 ~ session ~ token:", token)
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({token}){
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  
  ...authConfig
})