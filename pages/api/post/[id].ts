import { PrismaClient } from '@prisma/client'
import { Idiot } from '../../../types/types'

const prisma = new PrismaClient()

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const idiotId = req.query.id

    if (req.method === 'DELETE') {
        const idiot = await prisma.idiot.delete({
            where: { id: Number(idiotId) },
        })
        res.json(idiot)
    } else {
        throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}