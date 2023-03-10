import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)