import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Quote } from '../../../types/types'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, quote }: Quote = req.body

    const result: Quote = await prisma.quote.create({
      data: {
        name: name,
        quote: quote
      }
    })

    res.json(result)
  } else {
    res.status(400).send({ message: 'Bad Request' })
  }
}