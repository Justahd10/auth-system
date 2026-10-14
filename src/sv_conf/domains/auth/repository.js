export default class UserRepository {
  
  /**
   * @param {import('pg-promise').IDatabase<any>} db 
   */
  constructor(db) {
    this.db = db
  }


  // Basic query
  async selectUsers() {
    this.db.any()
  }

  /**
   * @param {import('./model.js').default} userData 
   */
  async insertAccount(userData) {
    const INSERT = `INSERT INTO users("email", "password")`;
    const VALUES = ` VALUES ($1, $2) RETURNING id, role;`;

    const userRaw = await this.db.query(INSERT + VALUES,
      [userData.email, userData.password]
    );

    return userRaw[0]
  }

  async updateAccount() {
    this.db.any()
  }

  async dropAccount() {
    this.db.any()
  }


  /*
      Specif querys
  */

  /**
   * @param {string} authEmail 
   */
  async selectAccountByEmail(authEmail) {
    const SELECT = `SELECT * FROM users`;
    const WHERE = ` WHERE email = $1;`;

    const userRaw = await this.db.query(SELECT + WHERE,
      [authEmail]
    );

    return userRaw
  }
}
