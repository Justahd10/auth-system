export default class UserRepository{
    constructor(db){
        this.db = db
    }


    // Basic query
    async selectUsers(){
        this.db.any()
    }

    async insertUser(userData){
        const userId = await this.db.query(
            `INSERT INTO users("email", "password") VALUES ($1, $2) RETURNING id;`, 
            [userData.email, userData.password]
        )[0];

        return userId
    }

    async updateUser(){
        this.db.any()
    }

    async dropUser(){
        this.db.any()
    }


    // Specif querys
    async selectUserByEmail(userEmail){
        const userRaw = await this.db.query(`SELECT * FROM users WHERE "email" = $1;`,
            [userEmail]
        );

        return userRaw
    }
}
