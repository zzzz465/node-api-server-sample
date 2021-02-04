import { Router } from 'express'
import * as User from '../../services/user'
import * as jwt from '../../middlewares/jwt'
import * as auth from '../../middlewares/auth'

const router = Router()

router.post('/login', async (req, res) => {
    if ('email' in req.body && 'password' in req.body) {
        const { email, password } = req.body
        const isValid = await User.validatePassword(email, password)

        if (isValid) {
            // const jwt = { email }
            const signed = jwt.sign({ email }, { expiresIn: '1h' })
            res.cookie('Authorization', `Bearer ${signed}`)
            res.status(200).end()
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