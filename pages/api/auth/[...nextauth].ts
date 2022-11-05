import NextAuth, { Session, NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../utils/prisma.server'
import { login } from "../../../utils/auth.server"

type LoginCredentials = {
  email: string
  password: string
}

type User = {
  id: number
  email: string
  role: string
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize ({email, password}: LoginCredentials) {
        return await login({ email, password }) ?? null
      }
    })
  ],

  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },

  callbacks: {
    async jwt({token, user}) {
      return {...token, role: user ? user.role : null}
    },
    
    // Returns new session
    async session({session, token}) {
      if (token.role) {
        session.user.role = token.role
      }
      
      return session
    }
  },

  pages: {
    signIn: '/signin',
    newUser: '/signup'
  }
}

export default NextAuth(authOptions)