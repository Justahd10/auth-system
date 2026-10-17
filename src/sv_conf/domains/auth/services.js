// Exceptions handling
import { UnauthorizedError, UnprocessableEntity } from "../../exceptions/ClientSideError.js";
import ServerSideError from "../../exceptions/ServerSideError.js";
// Data model
import User from "./model.js";
// Authentication credentials
import jwt from "jsonwebtoken";
// Email service
import { sendMail } from "./email_service/transporter.js";
// Redis operations
import { setKeyValue, getKeyValue, delKey } from "../../../redis_conf/querys.js";



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
	validateToken(token) {
		try {
			const credsData = jwt.verify(token);

			return credsData

		} catch (error) {
			throw new UnauthorizedError({
				'errCode': "NO_AUTHENTICATION",
			})
		}
	}

	/*
			Email confirmation services
	*/
	/**
	 * @typedef {string} mailConfirmToken
	 */

	/**
	 * @returns {mailConfirmToken}
	 */
	#generateEmailConfirmToken() {
		// Start token value
    let token = "";

    const chars = process.env.TOKEN_CHARS;

		// Build token value
    for (let i = 0; i < length; i++){
        const i = crypto.randomInt(0, chars.length);
        token = token + chars[i];
    }

    return token
	}

	/**
	 * @returns {string}
	 */
	#generateEmailConfirmCode() {
		// Start initial code value
		let code = "";
		const digits = [
			"0", "1", "2", "3", "4",
			"5", "6", "7", "8", "9",
		];

		// Build code with quantity number
		for (let i = 0; i < quantity; i++) {
			const value = digits[Math.floor(
				Math.random() * digits.length
			)]

			code = code + value;
		};

		return code
	}

	/**
	 * @param {string} email 
	 * @param {string} password 
	 * @returns {Promise<mailConfirmToken>}
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

		// 3. create token and confirmation code
		const code = this.#generateEmailConfirmCode();

		// 4. Try send email message
		try { sendMail(email, "mailConfirm", {
			'html': {
				'confirmCode': code
			}
		}) } catch (error){
			throw new ServerSideError({
				'errCode': "EMAIL_SEND_FAILED"
			})
		};

		// 4. Create token and Store data
		const token = this.#generateEmailConfirmToken(email);

		await setKeyValue(`email_confirm:${token}`, email, 300);
		await setKeyValue(`email_code:${token}`, code, 40);

		// 5. return session token
		return token
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
