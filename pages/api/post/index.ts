import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/post
// Required fields in body: name
// Optional fields in body: quote
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, quote } = req.body

    const result = await prisma.idiot.create({
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