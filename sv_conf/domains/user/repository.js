export default class UserRepository{
    constructor(db){
        this.db = db
    }


    // Basic query
    async selectUsers(){
        this.db.any()
    }

    async insertUser(userData){
        await this.db.query(
            `INSERT INTO users("email", "password") VALUES ($1, $2)`, 
            [userData.email, userData.password]
        );
    }

    async updateUser(){
        this.db.any()
    }

    async dropUser(){
        this.db.any()
    }


    // Specif querys
    async selectUserByEmail(userEmail){
        const userRaw = await this.db.query(`SELECT * FROM users WHERE "email" = $1`,
            [userEmail]
        );

        return userRaw
    }
}
