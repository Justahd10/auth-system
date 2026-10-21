import pgPromise from "pg-promise";



let pgp;
let databaseClient; // client

class PostgresClient {

  /**
   * @param {string} connectionString 
   */
  connect(connectionString) {
    pgp = pgPromise();
    databaseClient = pgp(connectionString);
  }

  /* Query models */

  async verify() {
    databaseClient.query(`SELECT *`)
    console.log("Postgres connection sucessful created");
  }

  quit() {
    console.log("closing PostgreSQL database connection...")
    pgp.end();
  }
}

const db = new PostgresClient();

export default db;