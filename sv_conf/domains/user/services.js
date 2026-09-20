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

        if (user.length === 0){
            return null
        }

        return user[0]
    }

    async registerUser(email, password){
        // 1. Check data formats
        const user = new User(email, password)

        this.#checkCredentialsFormat(user)

        // 2. Check if email alredy exists
        const userRaw = await this.#checkEmailExists(user.email)
        if (userRaw){
            throw Error("Email alredy exists", {
                'cause': { 'type': "emailExists" }
            })
        }
        
        // 3. do register query into data base
        user.hashPassword()
        await this.repository.insertUser(user)

        return user
    }

    async accessUserAccount(email, password){
        // 1. Check data formats
        const user = new User(email, password)

        this.#checkCredentialsFormat(user)

        // 2. Validate both credentials
        const userRaw = await this.#checkEmailExists(user.email)

        if (!(
            userRaw && 
            User.comparePassword(password, userRaw.password)
        )){
            throw Error("Invalid credentials", {
                'cause': { 'type': "invalidCreds" }
            })
        }
    }
}
