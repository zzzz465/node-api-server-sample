import { Container } from 'typedi'
import { Router } from 'express'
import UserService from '../../services/user'
import * as jwt from '../../middlewares/jwt'
import * as auth from '../../middlewares/auth'

const User = Container.get(UserService)

const router = Router()

/**
 * @api {POST} /users/login
 * @apiName login
 * @apiGroup auth
 * @apiVersion  0.1.0
 * @apiParam (Body) {String} email user email
 * @apiParam (Body) {String} password user password
 * @apiSuccess (Success 200 Cookie) {String} Authentication JWT authentication token
 */
router.post('/login', async (req, res) => {
    if ('email' in req.body && 'password' in req.body) {
        const { email, password } = req.body
        const isValid = await User.validatePassword(email, password)

        if (isValid) {
            // const jwt = { email }
            const signed = jwt.sign({ email }, { expiresIn: '5min' })
            res.cookie('Authorization', `Bearer ${signed}`)
            res.status(201).end()
        } else {
            res.status(400).json({ message: 'wrong email or password' }).end()
        }
    } else {
        res.status(400).end()
    }
})

// 아 이거 문서질 왜케 힘드냐?
/**
 * @api {POST} /users/register
 * @apiname register
 * @apiGroup auth
 * @apiVersion 0.1.0
 * @apiParam (Body) {String} email user email
 * @apiParam (Body) {String} password user password
 * @apiSuccess (Status) {200} Code 생성에 성공, login api로 로그인 해야함
 * @apiError (Status) {Number} Code 400 생성에 실패, 중복 또는 
 */
router.post('/register', async (req, res) => {
    if (req.body && 'email' in req.body && 'password' in req.body) {
        const { email, password } = req.body
        const success = await User.registerUser(email, password)
        if (success)
            res.status(200).end()
        else
            res.status(400).json({ message: 'email already exists' }).end()
    } else {
        res.status(400).end()
    }
})

router.get('/verify', auth.user, async (req, res) => {
    res.json({ message: `hello email: "${(<any>req).user.email}"! you've been verified` }).status(200).end()
})

export default router