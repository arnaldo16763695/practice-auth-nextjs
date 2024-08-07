import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from '@/lib/db'


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    ...authConfig,
    session: { strategy: "jwt" },
    // providers: [],
    callbacks: {
        jwt({ token, user }) {
          if (user) { // User is available during sign-in
            token.role = user.role
          }
          return token
        },
        session({ session, token }) {
          if (session.user) {
            session.user.role = token.role
          }
          return session
        },
      },

})