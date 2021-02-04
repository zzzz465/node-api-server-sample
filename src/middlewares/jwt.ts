import jwt from 'jsonwebtoken'

const SECRET_KEY = 'SECRET_KEY????'

/**
 * @see [jwt.sign()](link)
 */
export function sign(payload: string | object, options?: jwt.SignOptions) {
    return jwt.sign(payload, SECRET_KEY, options)
}

export const decode = jwt.decode

export function verify(token: string, options?: jwt.VerifyOptions) {
    return jwt.verify(token, SECRET_KEY, options)
}