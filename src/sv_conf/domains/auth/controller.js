// Helpers
import {
	resolveErrorResponse, returnRes, 
	prepareResponse, setAuthCookie
} from "../../utils.js"



export default class AuthController {
	static Errors = {
		'credFormat': 422,
		'emailExists': 409,
		'invalidCreds': 401
	}

	/**
	 * 
	 * @param {import('./services.js').default} service 
	 */
	constructor(service) {
		this.service = service
	}

	/**
	 * 
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 */
	async handleRegister(req, res) {
		// 1. Try create account
		try {
			const accessToken = 
			await this.service.registerAccount(
				req.body.email, req.body.password
			)

			// 2. Prepare credentials
			setAuthCookie("access_token", res, accessToken)

			return returnRes(200, res)

		} catch (error) {
			// 3. Response error

		}
	}

	/**
	 * 
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 */
	async handleLogin(req, res) {
		// 1. Try access account data
		try {
			const accessToken = 
			await this.service.accessAccount(
				req.body.email, req.body.password
			)

			// 2. Prepare credentials
			setAuthCookie("access_token", res, accessToken)

			return returnRes(200, res)

		} catch (error) {
			// 3. Error response

		}
	}

	/**
	 * 
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 */
	handleAuthDetails(req, res) {
		// 1. Check cookie value
		const accessToken = req.cookies.accessToken;

		if (accessToken){
			// 2. Check validation
			const authDetails = 
			this.service.validateToken(accessToken);

			if (authDetails){
				prepareResponse({
					'response': res,
					'type': "success",
					'values': {
						'authenticated': true,
						'role': credsDetails.role
					}
				})

				return res.status(200).json(
					res.locals.payload
				)
			}
		}
		
		// 3. Error response
	}
}