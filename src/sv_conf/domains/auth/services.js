import { UnauthorizedError, UnprocessableEntity } from "../../exceptions/ClientSideError.js";
import User from "./model.js";
import jwt from "jsonwebtoken";



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
			if (!valid) throw new UnauthorizedError({
				'errCode': "INVALID_CREDENTIALS",
				'errItems': [field]
			})
		}
	}

	async #checkEmailExists(email) {
		const user = 
		await this.repository.selectAccountByEmail(email)
		if (user.length === 0) return null

		return user[0]
	}

	/*
			Crendentials token operations
	*/

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
			throw new UnauthorizedError({
				'errCode': "NO_AUTHENTICATION",
			})
		}
	}

	/*
			Email confirmation services
	*/
	/**
	 * @typedef {string} sessionToken
	 */

	/**
	 * @param {string} email
	 * @returns {sessionToken}
	 */
	generateEmailConfirmToken(email){

	}

	/**
	 * @returns {string}
	 */
	generateEmailConfirmCode(){

	}

	/**
	 * @param {string} email 
	 */
	sendEmailConfirmationMessage(email){

	}

	/**
	 * @param {string} email 
	 * @param {string} password 
	 * @returns {sessionToken}
	 */
	async registerAccount(email, password) {
		// 1. Check data formats
		const user = new (email, password)

		this.#checkCredentialsFormat(user)

		// 2. Check if email alredy exists
		let userRaw = 
		await this.#checkEmailExists(user.email)
		if (userRaw) throw new UnprocessableEntity({
			'errCode': "EMAIL_CONFLICT"
		})

		// 3. create session token
		

		// 4. Store data in Redis


		// 5. return session token
		return 
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
			throw new UnauthorizedError({
				'errCode': "INVALID_CREDENTIALS"
			})
		}

		// 3. return access token
		const accessToken = this.#generateAccessToken(
			userRaw.id, userRaw.role
		)

		return accessToken
	}
}
