import request from 'supertest'
import { app } from '../index'

describe('API /users/login', () => {
    test('login should reject unknown email', () => {
        request(app)
            .get('/users/login')
    })
})