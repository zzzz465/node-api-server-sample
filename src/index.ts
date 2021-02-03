import App from 'express'
import { createServer } from 'http'
import { sign } from 'jsonwebtoken'
import { createPool } from 'mariadb'

import Users from './routes/users'

const PRIVATE_KEY = 'THIS_IS_PRIVATE_KEY'

const dbPool = createPool({
    host: 'localhost',
    port: 3389,
    user: 'root',
    password: 'password',
    connectionLimit: 10
})

const server = createServer()
server.listen(80)

const app = App()
app.use('/users', Users)

app.listen(server)