import bcrypt from "bcrypt"



export default class User{
    // Internal validation roles
    #emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    #passwordRegex = /^.{8,}$/
    
    
    constructor(email, password){
        // this.id = id 
        this.email = email;
        this.password = password;
    }


    validateCreds(){
        const validation  = [
            this.#emailRegex.test(this.email),
            this.#passwordRegex.test(this.password)
        ]

        return {
            'email': validation[0],
            'password': validation[1]
        }
    }

    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 12)
    }

    static comparePassword(password, encrypted){
        return bcrypt.compareSync(password, encrypted)
    }
}
