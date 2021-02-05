import 'reflect-metadata'

import { createServer } from 'http'
import app from './app'

import Users from './routes/users'

const server = createServer()
server.listen(80)

app().listen(server)