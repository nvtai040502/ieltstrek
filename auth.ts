import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./actions/database/user"
import { UserRole } from "@prisma/client"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut
} = NextAuth({
  session: {strategy: "jwt"},
  pages: {
    signIn: "/login",
    error: "/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
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