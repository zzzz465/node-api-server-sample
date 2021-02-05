import 'reflect-metadata'
import { container, inject } from 'tsyringe'
import request from 'supertest'
import App from '../app'
import IUserModel from '../models/interfaces/IUserModel'
import UserService from '../services/user'
import UserModel from '../models/user'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'

describe('API /users/login', () => {
    const mockUserModelFactory = () => ({
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
    })

    container.register(UserModel, { useFactory: mockUserModelFactory })

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

    test('/users/login should deny unknown credentials', async () => {
        const app = App()
        const respond = await request(app)
            .post('/users/login')
            .set('Accept', 'application/json')
            .send({ email: 'email', password: 'password_hash' })

        expect(respond.headers.Authorization).toBeUndefined()
        expect(respond.status).toBe(400)
    })

    test('can register new email', async () => {
        const app = App()
        const respond = await request(app)
            .post('/users/register')
            .set('Accept', 'application/json')
            .send({ email: 'email', password: 'password_hash' })

        expect(respond.status).toBe(201)
    })

    test('can login with valid credentials', async () => {
        const app = App()
        const register_res = await request(app)
            .post('/users/register')
            .set('Accept', 'application/json')
            .send({ email: 'email', password: 'password_hash' })

        expect(register_res.status).toBe(201)

        const login_res = await request(app)
            .post('/users/login')
            .set('Accept', 'application/json')
            .send({ email: 'email', password: 'password_hash' })
        
        expect(login_res.status).toBe(200)
    })
})