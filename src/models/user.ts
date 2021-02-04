import { getConnection } from './db'
import { error } from 'winston'
import { Service } from 'typedi'
import IUserModel from './interfaces/IUserModel'

@Service()
export default class UserModel implements IUserModel {
    async registerUser(email: string, encrypted: string): Promise<boolean> {
        let success = false
        const connection = await getConnection()
        await connection.beginTransaction()
        try {
            const query_string = 'SELECT 1 FROM users WHERE email = ? LIMIT 1'
            const rows = await connection.query(
                query_string,
                [email]
            ) as any[]

            const notExist = rows.length === 0 // meta always exists.
            if (notExist) {
                const res = await connection.query(
                    'INSERT INTO users VALUES (?, UNHEX(?))',
                    [email, encrypted]
                )

                connection.commit()
                success = res.affectedRows == 1
            }
        } catch (err) {
            console.error(err)
            error(err)
        } finally {
            connection.release()
        }

        return success
    }

    async getUser(email: string) {
        let object: any | undefined = undefined
        const connection = await getConnection()
        try {
            const result = await connection.query(
                'SELECT email, HEX(password) AS encrypted FROM users WHERE email = (?) LIMIT 1',
                [email]
            ) as any[]
            if (result.length == 1)
                object = { email: result[0].email, encrypted: result[0].encrypted }
        } catch (err) {
            error(err)
        } finally {
            await connection.release()
        }

        return object
    }
}