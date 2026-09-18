import pgPromise from "pg-promise" 



// Postgres connection string
const connection = process.env.DB_CONNECTION

// Database instance
const pgp = pgPromise()
const db = pgp(connection)

console.log("Postgres connection created.")

export default db