// Library importing
import pgPromise from "pg-promise" 



export default function startDatabase(){
    // Postgres connection string
    const connection = process.env.DB_CONNECTION

    // Database instance
    const pgp = pgPromise()
    const db = pgp(connection)

    return db
}