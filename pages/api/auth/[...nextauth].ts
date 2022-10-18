import NextAuth, { Session } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from 'next-auth'
import { prisma } from '../../../utils/prisma.server'
import { login } from "../../../utils/auth.server"

type LoginCredentials = {
    email: string
    password: string
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize({email, password}: LoginCredentials) {

        const user = await login({ email, password })
        
        //const userr = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        if (user) {
          return user
        } else {
          return null
        }
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
      if (user) {
        token.role = user.role
      }
      return token
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