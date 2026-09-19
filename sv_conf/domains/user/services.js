import User from "./model.js";



export default class UserService{
    constructor(repository){
        this.repository = repository
    }


    #checkCredentialsFormat(user){
        const validations = user.validateCreds()

        for (
            const [field, valid] of 
            Object.entries(validations)
        ){
            if (!valid) throw Error(
                "Invalid credentials format", 
                { 'cause': {
                    'type': "credFormat",
                    'field': field
                } }
            )
        }
    }

    async #checkEmailExists(email){
        const user = 
        await this.repository.selectUserByEmail(email)

        if (user.length > 0){
            throw Error("Email alredy exists", {
                'cause': { 'type': "emailExists" }
            })
        }
    }

    async registerUser(email, password){
        // 1. Check data formats
        const user = new User(email, password)

        this.#checkCredentialsFormat(user)

        // 2. Check if email alredy exists
        await this.#checkEmailExists(user.email)
        
        // 2. do database query
        await this.repository.insertUser(user)

        return user
    }
}
