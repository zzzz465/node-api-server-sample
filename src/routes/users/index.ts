import { Router } from 'express'
import * as User from '../../services/user'
import { sign } from 'jsonwebtoken'

const SECRET_KEY = 'secret_key???'

const router = Router()

router.post('/login', async (req, res) => {
    if ('email' in req.body && 'password' in req.body) {
        const { email, password } = req.body
        const isValidPW = await User.validatePassword(email, password)

        if (isValidPW) {
            const jwt = { email }
            const signed = sign(jwt, SECRET_KEY, { expiresIn: '1h' })
            res.status(200).json(signed).end()
        } else {
            res.status(400).json({ message: 'wrong email or password' }).end()
        }
    } else {
        res.status(400).end()
    }
})

router.post('/register', async (req, res) => {
    if (req.body && 'email' in req.body && 'password' in req.body) {
        const { email, password } = req.body
        await User.registerUser(email, password)
        res.status(200).end()
    } else {
        res.status(400).end()
    }
})

export default router