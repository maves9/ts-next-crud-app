import { PrismaClient } from '@prisma/client'
import { Quote } from '../../../types/types'

const prisma = new PrismaClient()

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const quoteId = req.query.id

    if (req.method === 'DELETE') {
        const quote: Quote = await prisma.quote.delete({
            where: { id: quoteId },
        })

        res.json(quote)
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
}