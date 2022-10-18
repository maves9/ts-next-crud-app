import bcrypt from 'bcryptjs'
import { prisma } from './prisma.server'

export const createUser = async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash
        }
    })
    return { id: newUser.id, email: user.email }
}

export const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw Error(`{ { error: Incorrect login }, { status: 400 } }`)
    }

    return { id: user.id, email: user.email, role: user.role }
}
