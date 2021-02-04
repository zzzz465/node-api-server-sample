import { createHash, createHmac } from 'crypto'
import * as User from '../models/user'
import * as jwt from '../middlewares/jwt'

const HASH_SECRET = 'HASH_SECRET_VAL'

function hash(data: string) {
    return createHmac('sha256', HASH_SECRET).update(data).digest('hex')
}

export async function registerUser(email: string, password: string) {
    const hashed = hash(password)
    return User.registerUser(email, hashed)
}

export async function validatePassword(email: string, password: string) {
    const result = await User.getUser(email)
    if (result) {
        const hashed = hash(password)
        return hashed.toLowerCase() === (<string>result.encrypted).toLowerCase()
    } else {
        return false
    }
}