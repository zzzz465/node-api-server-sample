import { getConnection } from './db'
import { error } from 'winston'

export async function registerUser(email: string, encrypted: string): Promise<boolean> {
    let success = false
    const connection = await getConnection()
    await connection.beginTransaction()
    try {
        const rows = await connection.query(
            'SELECT EXISTS(SELECT 1 FROM users WHERE email = (?), password = (?) LIMIT 1)',
            [email, encrypted]
        ) as any[]

        const notExist = rows.length == 1 // meta always exists.
        if (notExist) {
            const rows = await connection.query(
                'INSERT INTO usere VALUES (? ?)',
                [email, encrypted]
            )

            success = rows.affectedRows == 1
        }
    } catch (err) {
        error(err)
    } finally {
        connection.release()
    }

    return success
}

export async function getUser(email: string): Promise<any | undefined> {
    let object: any | undefined = undefined
    const connection = await getConnection()
    try {
        const result = await connection.query(
            'SELECT * FROM users WHERE email = (?)', 
            [email]
        ) as any[]
        if (result.length == 2)
            object = { email: result[0].email, encrypted: result[0].password }
    } catch (err) {
        error(err)
    } finally {
        await connection.release()
    }

    return object
}