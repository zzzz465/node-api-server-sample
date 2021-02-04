import { Request, Response, NextFunction } from 'express'
import * as jwt from './jwt'

export function user (req: Request, res: Response, next: NextFunction) {
    try {
        if (req.cookies.Authorization) {
            const auth_token = (req.cookies.Authorization as string).split('Bearer ')[1]
            jwt.verify(auth_token)
            const user = jwt.decode(auth_token);
            (<any>req).user = user
            next()
        } else {
            throw new Error('Authorization field is empty')
        }
    } catch (err) {
        res.status(400).json({ message: err }).end()
        console.error(err)
    }
}