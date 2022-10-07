import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Idiot } from '../../../types/types'

const prisma = new PrismaClient()

// POST /api/post
// Required fields in body: name
// Optional fields in body: quote
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, quote }: Idiot = req.body

    const result: Idiot = await prisma.idiot.create({
      data: {
        name: name,
        quote: quote,
      },
    });

    res.json(result)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}