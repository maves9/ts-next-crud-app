import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../utils/auth.server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const result = createUser({ email: email, password: password })

    res.json(result)
  } else {
    res.status(400).send({ message: 'Bad Request' })
  }
}