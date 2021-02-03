import { createHash, createHmac } from 'crypto'
import * as User from '@/models/user'

const secret = 'secret_key'

function hash(data: string) {
    return createHmac('sha256', secret).update(data).digest('hex')
}

export async function registerUser(email: string, password: string) {
    const hashed = hash(password)
    return User.registerUser(email, password)
}

export async function validatePassword(email: string, password: string) {
    const result = await User.getUser(email)
    const hashed = hash(password)

    return hashed === result.encrypted
}