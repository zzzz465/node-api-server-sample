import { createPool } from 'mariadb'

const pool = createPool({
    user: 'root',
    password: 'password',
    host: 'localhost',
    port: 3306,
    connectionLimit: 10,
    database: 'mysql'
})

export const getConnection = () => pool.getConnection()