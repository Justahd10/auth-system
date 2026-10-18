import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
	UnauthorizedError,
	UnprocessableEntity
} from "../../exceptions/ClientSideError.js";
import User from "./model.js";
import { sendMailConfirmMsg } from "./email_service/messages.js";
import {
	setKeyValue,
	getKeyValue,
	delKey
} from "../../../redis_conf/querys.js";



export default class AuthService {

	/**
	 * @param {import('./repository.js').default} repository 
	 */
	constructor(repository) {
		this.repository = repository
	}


	/**
	 * @param {string} email 
	 * @returns {Promise<object | null>}
	 */
	async #checkMailExists(email) {
		const user =
			await this.repository.selectAccountByMail(email)

		return user.length > 0 ? user[0] : null
	}

	/**
	 * @param {string} email 
	 */
	async #checkMailConflict(email) {
		if (await this.#checkMailExists(email)) {
			throw new UnprocessableEntity({
				'errCode': "EMAIL_CONFLICT"
			})
		}
	}

	/**
	 * @param {string} email
	 * @param {password} password 
	 */
	#validateCredsFormats(email, password) {
		const validations =
			new User(email, password).validateCreds()

		// Check some invalid value
		const item = Object.entries(validations).find(
			item => !item[1]
		)

		if (item) throw new UnauthorizedError({
			'errCode': "INVALID_CREDENTIALS",
			'errItems': [item[0]]
		})
	}

	/**
	 * @param {string} email
	 * @param {string} password 
	 */
	async #validateCredsValues(email, password) {
		const userRaw = await this.#checkMailExists(email);

		if (!(
			userRaw &&
			User.comparePassword(password, userRaw.password)
		)) {
			throw new UnauthorizedError({
				'errCode': "INVALID_CREDENTIALS"
			})
		}
	}

	/**
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
	 * @param {string} token
	 * @returns {{
	 * 	"sub": string, "role": string,
	 * 	"iat": number, "exp": number,
	 * 	"iss": string
	 * } | null}
	 */
	validateToken(token) {
		try {
			const credsData = jwt.verify(
				token,
				process.env.TOKEN_SECRET,
				{
					'issuer': process.env.TOKEN_ISSUER,
				}
			);

			return credsData

		} catch (error) {
			throw new UnauthorizedError({
				'errCode': "NO_AUTHENTICATION",
			})
		}
	}

	/**
	 * @typedef {string} mailConfirmToken
	 */

	/**
	 * @param {number} length
	 * @returns {string}
	 */
	#generateMailConfirmCode(length) {
		let n = "";

		while (n.length < length + 1) {
			n = n + String(crypto.randomInt(0, 10))
		};

		return n
	}

	/**
	 * @param {string} email 
	 * @param {string} password 
	 * @returns {Promise<mailConfirmToken>}
	 */
	async registerAccount(email, password) {
		// 1. Check data formats
		this.#validateCredsFormats(email, password)

		// 2. Check if email alredy exists
		await this.#checkMailConflict(email);

		// 3. create token and confirmation code
		const code = this.#generateMailConfirmCode(5);
		const token = crypto.randomBytes(32).toString("hex");

		// 4. Try send email message
		await sendMailConfirmMsg(email, code);

		// 5. Store data
		await setKeyValue(`email_confirm:${token}`, email, 300);
		await setKeyValue(`email_code:${token}`, code, 100);

		// 6. return session token
		return token
	}

	async accessAccount(email, password) {
		// 1. Check data formats
		this.#validateCredsFormats(email, password)

		// 2. Validate both credentials
		await this.#validateCredsValues(email, password);

		// 3. return access token
		const accessToken = this.#generateAccessToken(
			userRaw.id, userRaw.role
		)

		return accessToken
	}
}