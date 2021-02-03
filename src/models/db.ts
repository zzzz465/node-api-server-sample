import { createPool } from 'mariadb'

const pool = createPool({
    user: 'root',
    password: 'password',
    host: 'localhost',
    port: 3389
})

export const getConnection = pool.getConnection