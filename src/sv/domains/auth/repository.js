export default class UserRepository {
  
  /**
   * @param {import('pg-promise').IDatabase<any>} db 
   */
  constructor(db) {
    this.db = db
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


  /*
      Specif querys
  */

  /**
   * @param {string} authEmail 
   */
  async selectAccountByMail(authEmail) {
    const SELECT = `SELECT * FROM users`;
    const WHERE = ` WHERE email = $1;`;

    const userRaw = await this.db.query(SELECT + WHERE,
      [authEmail]
    );

    return userRaw
  }
}
