import pgPromise from "pg-promise"



let pgp;
let databaseClient; // client

// set dabase connection

/**
 * @param {string} connection 
 */
export function setDatabaseClient(connection) {
  pgp = pgPromise();
  databaseClient = pgp(connection);
};

// test dabatase connection
export async function testDabaseClient() {
  databaseClient.query(`SELECT *`)
  console.log("Postgres connection sucessful created");
};

// close database connection
export function closeDatabaseClient() {
  console.log("closing PostgreSQL database connection...")
  pgp.end();
}

export default databaseClient