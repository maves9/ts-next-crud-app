import type { NextPage } from 'next'
import { Quote } from '../types/types'

import Head from 'next/head'
import { PrismaClient } from '@prisma/client'
import List from '../components/List'
import Layout from "../components/Layout"

const prisma = new PrismaClient()

export const getServerSideProps = async () => {
  const initialQuotes: Quote[] = await prisma.quote.findMany()  
 
  return { 
    props: { initialQuotes: initialQuotes }
  }
}

const Home: NextPage<{initialQuotes: Quote[]}> = ({ initialQuotes }): JSX.Element => {
  return (
    <>
      <Head>
        <title>CRUD APP - Collection of quotes</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <List initialQuotes={initialQuotes} />
    </>
  )
}

export default Home
