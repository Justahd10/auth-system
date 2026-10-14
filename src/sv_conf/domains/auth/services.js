import ClientSideError from "../../exceptions/ClientSideError.js";
import User from "./model.js";
import jwt from "jsonwebtoken"



export default class AuthService {

	/**
	 * @param {import('./repository.js').default} repository 
	 */
	constructor(repository) {
		this.repository = repository
	}


	/**
	 * @param {User} user 
	 */
	#checkCredentialsFormat(user) {
		const validations = user.validateCreds()

		for (
			const [field, valid] of
			Object.entries(validations)
		) {
			if (!valid) throw new ClientSideError(
				"INVALID_CREDENTIALS", [field]
			)
		}
	}

	async #checkEmailExists(email) {
		const user = 
		await this.repository.selectAccountByEmail(email)
		if (user.length === 0) return null

		return user[0]
	}

	/**
	 * 
	 * @param {string} userId 
	 * @param {"user" | "admin"} userRole 
	 * @returns {string}
	 */
	#generateAccessToken(userId, userRole) {
		return jwt.sign({ 'sub': userId, 'role': userRole },
			process.env.TOKEN_SECRET,
			{
				'header': { 'typ': "JWT" },
				'issuer': process.env.TOKEN_ISSUER,
				'expiresIn': Number(process.env.ACCESS_TOKEN_EXP)
			}
		)
	}

	/**
	 * 
	 * @param {string} token
	 * @returns {{
	 * 	"sub": string, "role": string,
	 * 	"iat": number, "exp": number,
	 * 	"iss": string
	 * } | null}
	 */
	validateToken(token){
		try {
			const credsData = jwt.verify(token);

			return credsData

		} catch(error){
			throw new ClientSideError("NO_AUTHENTICATION")
		}
	}

	async registerAccount(email, password) {
		// 1. Check data formats
		const user = new (email, password)

		this.#checkCredentialsFormat(user)

		// 2. Check if email alredy exists
		let userRaw = 
		await this.#checkEmailExists(user.email)
		if (userRaw) throw new ClientSideError("EMAIL_CONFLICT");

		// 3. do register query into data base
		user.hashPassword()
		userRaw = 
		await this.repository.insertAccount(user)

		// 4. return access token
		const accessToken = this.#generateAccessToken(
			userRaw.id, userRaw.role
		)

		return accessToken
	}

	async accessAccount(email, password) {
		// 1. Check data formats
		const user = new User(email, password)

		this.#checkCredentialsFormat(user)

		// 2. Validate both credentials
		const userRaw = 
		await this.#checkEmailExists(user.email)

		if (!(
			userRaw &&
			User.comparePassword(password, userRaw.password)
		)) {
			throw new ClientSideError("INVALID_CREDENTIALS");
		}

		// 3. return access token
		const accessToken = this.#generateAccessToken(
			userRaw.id, userRaw.role
		)

		return accessToken
	}
}
