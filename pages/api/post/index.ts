import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma.server'
import { Quote } from '../../../types/types'

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