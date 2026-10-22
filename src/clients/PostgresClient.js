import pgPromise from "pg-promise";



export default class PostgresClient {

  /**
   * @param {string} connectString 
   */
  constructor(connectString) {
    this.connectString = connectString;

    this.pgp = null;
    this.db = null;
  }

  /**
   * @param {string} connectionString 
   */
  connect() {
    console.log("Creating postgres session...");
    this.pgp = pgPromise();
    this.db = pgp(this.connectString);
  }

  /* Query models */

  /**
   * @returns {Promise<void>}
   */
  async verify() {
    console.log("Testing postgres session...");
    await this.db.connect();
  }

  /**
   * @return {Promise<void>}
   */
  quit() {
    console.log("Closing postgres session...")
    this.pgp.end();
  }
}