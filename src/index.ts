import App, { json } from 'express'
import { createServer } from 'http'
import { sign } from 'jsonwebtoken'
import { createPool } from 'mariadb'
import { text, raw, urlencoded } from 'body-parser'

import Users from './routes/users'

const server = createServer()
server.listen(80)

const app = App()
app.use(json())
app.use('/users', Users)

app.listen(server)