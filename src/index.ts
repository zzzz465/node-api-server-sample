import App, { json } from 'express'
import { createServer } from 'http'
import cookieParser from 'cookie-parser'

import Users from './routes/users'

const server = createServer()
server.listen(80)

const app = App()
app.use(json())
app.use(cookieParser())
app.use('/users', Users)

app.listen(server)