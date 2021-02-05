import App, { json } from 'express'
import cookieParser from 'cookie-parser'

import Users from './routes/users'

export default function () {
    const app = App()
    app.use(json())
    app.use(cookieParser())
    app.use('/users', Users())

    return app
}