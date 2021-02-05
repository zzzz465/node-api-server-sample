import { injectable, inject } from 'tsyringe'
import { createHash, createHmac } from 'crypto'
import IUserModel from '../models/interfaces/IUserModel'
import UserModel from '../models/user'

const HASH_SECRET = 'HASH_SECRET_VAL'

@injectable()
export default class UserService {
    constructor(
        @inject(UserModel)
        private userModel: IUserModel
    ) { }

    hash(data: string) {
        return createHmac('sha256', HASH_SECRET).update(data).digest('hex')
    }

    registerUser(email: string, password: string) {
        const hashed = this.hash(password)
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