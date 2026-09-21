import User from "./model.js";
import jwt from "jsonwebtoken"



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

    #generateToken(tokenDatas){
        // 1. preapre tokens return
        const tokens ={ 'access': null, 'refresh': null }

        // 2. preapre expiration times
        const expTimes ={
            'access': Number(process.env.ACCESS_TOKEN_EXP),
            'refresh': Number(process.env.REFRESH_TOKEN_EXP)
        }

        // 3. Create tokens
        Object.keys(tokenDatas).forEach(tokenData=> {
            tokens[tokenData.type] = jwt.sign(
                tokenData.data,
                process.env.TOKEN_SECRET,
                {
                    'header': {'typ': tokenData.type},
                    'issuer': process.env.TOKEN_ISSUER,
                    'expiresIn': expTimes[tokenData.type]
                }
            )
        })
        
        return tokens
    }

    #validateToken(type){
        
    }

    async registerUserAccount(email, password){
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

        // 4. return session tokens
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

        // 3. return session tokens
    }
}
