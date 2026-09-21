export default class UserRepository{
    constructor(db){
        this.db = db
    }


    // Basic query
    async selectUsers(){
        this.db.any()
    }

    async insertAccount(userData){
        const userId = await this.db.query(
            `INSERT INTO users("email", "password") VALUES ($1, $2) RETURNING id;`, 
            [userData.email, userData.password]
        )[0];

        return userId
    }

    async updateAccount(){
        this.db.any()
    }

    async dropAccount(){
        this.db.any()
    }


    // Specif querys
    async selectAccountByEmail(authEmail){
        const userRaw = await this.db.query(`SELECT * FROM users WHERE "email" = $1;`,
            [authEmail]
        );

        return userRaw
    }
}
