import { Container, Inject, Service } from 'typedi'
import { createHash, createHmac } from 'crypto'
import * as jwt from '../middlewares/jwt'
import IUserModel from '../models/interfaces/IUserModel'

const HASH_SECRET = 'HASH_SECRET_VAL'

@Service()
export default class UserService {
    constructor(
        @Inject('UserModel')
        private userModel: IUserModel
    ) { }

    hash(data: string) {
        return createHmac('sha256', HASH_SECRET).update(data).digest('hex')
    }

    registerUser(email: string, password: string) {
        const hashed = this.hash(email)
        return this.userModel.registerUser(email, hashed)
    }

    async validatePassword(email: string, password: string) {
        const result = await this.userModel.getUser(email)
        if (result) {
            const hashed = this.hash(password)
            return hashed.toLowerCase() === (result.encrypted).toLowerCase()
        } else {
            return false
        }
    }
}