import pgPromise from "pg-promise";



// Local client setting
let pgp;
let databaseClient;


class PostgresClient {

  /**
   * @param {string} connectionString 
   */
  create(connectionString) {
    console.log("Creating postgres session...");
    pgp = pgPromise();
    databaseClient = pgp(connectionString);
  }

  /* Query models */

  /**
   * @returns {Promise<void>}
   */
  async verify() {
    console.log("Testing postgres session...");
    await databaseClient.connect();
  }

  /**
   * @return {Promise<void>}
   */
  quit() {
    console.log("Closing postgres session...")
    pgp.end();
  }
}

// Client instance
const db = new PostgresClient();

export default db;