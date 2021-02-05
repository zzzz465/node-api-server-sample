import 'reflect-metadata'
import { container, inject } from 'tsyringe'
import request from 'supertest'
import { app } from '../index'
import IUserModel from '../models/interfaces/IUserModel'
import UserService from '../services/user'
import UserModel from '../models/user'

describe('API /users/login', () => {
    const mockUserModel = {
        map: new Map<string, any>(),
        async getUser(email: string): Promise<any> {
            if (this.map.has(email))
                return this.map.get(email)
            else
                return undefined
        },
        async registerUser(email: string, encrypted: string): Promise<boolean> {
            if (!this.map.has(email)) {
                this.map.set(email, { email, encrypted })
                return true
            } else {
                return false
            }
        }
    }

    container.register(UserModel, { useValue: mockUserModel })

    const userService = container.resolve(UserService)
    test('login should reject unknown email', async () => {
        const flag = await userService.validatePassword('unknown', 'password')

        expect(flag).toBeFalsy()
    })

    test('register email', async () => {
        const flag = await userService.registerUser('email', 'password_hash')

        expect(flag).toBeTruthy()
    })

    test('email should be working after register', async () => {
        const flag = await userService.validatePassword('email', 'password_hash')

        expect(flag).toBeTruthy()
    })
})