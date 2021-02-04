import { Container, Service } from 'typedi'
import { createHash, createHmac } from 'crypto'
import * as jwt from '../middlewares/jwt'

const HASH_SECRET = 'HASH_SECRET_VAL'

abstract class UserModel {
    abstract registerUser (email: string, hashed: string): boolean
    abstract getUser (email: string): any | undefined
}

/*
@Service()
class FirstUserModel implements UserModel {
    registerUser(email: string, hashed: string): boolean {
        throw new Error('Method not implemented.')
    }
    getUser(email: string) {
        throw new Error('Method not implemented.')
    }
}

@Service()
class SecondUserModel implements UserModel {
    registerUser(email: string, hashed: string): boolean {
        throw new Error('Method not implemented.')
    }
    getUser(email: string) {
        throw new Error('Method not implemented.')
    }
}
*/

@Service()
export default class UserService {
    constructor(
        private userModel: UserModel
    ) { }

    hash(data: string) {
        return createHmac('sha256', HASH_SECRET).update(data).digest('hex')
    }

    registerUser(email: string, password: string) {
        const hashed = this.hash(email)
        return this.userModel.registerUser(email, hashed)
    }

    async validatePassword(email: string, password: string) {
        const result = this.userModel.getUser(email)
        if (result) {
            const hashed = this.hash(password)
            return hashed.toLowerCase() === (result.encrypted).toLowerCase()
        } else {
            return false
        }
    }
}