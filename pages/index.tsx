import type { NextPage } from 'next'

import Head from 'next/head'
import { PrismaClient } from '@prisma/client'
import { useState } from 'react'
import Create from '../components/Create'
import List from '../components/List'
import { Idiot } from '../types/types'

const prisma = new PrismaClient()

export const getStaticProps = async () => {
  const initialIdiots: Idiot[] = await prisma.idiot.findMany()
  return { 
    props: { initialIdiots }
  }
}

const Home: NextPage<{initialIdiots: Idiot[]}> = ({ initialIdiots }) => {
  const [idiots, setIdiots] = useState<Idiot[]>(initialIdiots)

  const moreIdiots = (addedIdiot: Idiot) => {
    setIdiots([...idiots, addedIdiot])
  }

  const removeIdiot = (removedIdiot: Idiot) => {
    setIdiots(idiots.filter((item) => item.id !== removedIdiot.id))
  }

  return (
    <>
      <Head>
        <title>CRUD APP - Collection of idiots</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        body {
          background: #222;
          color: #fff;
          margin: 0;
          font-family: cursive;
        }
      `}</style>

      <style jsx>{`
        main {
          max-width: 600px;
          margin: auto;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: royalblue;
        }
      `}</style>

      <main>
        <List idiots={idiots} removeIdiot={removeIdiot} />

        <Create moreIdiots={moreIdiots} />
      </main>
    </>
  )
}

export default Home
