// Helpers
import ClientSideError from "../../exceptions/ClientSideError.js"
import { resolveResponse, resolveError, setAuthCookie } from "../../utils.js"



export default class AuthController {

	/**
	 * @param {import('./services.js').default} service 
	 */
	constructor(service) {
		this.service = service
	}

	/**
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

			return resolveResponse({
				'res': res,
				'type': "success",
				'status': 200
			})

		} catch (error) {
			// 3. Response error
			const errFormat = resolveError(error);

			return resolveResponse({
				'res': res,
				'type': "success",
				'values': errFormat
			})
		}
	}

	/**
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

			return resolveResponse({
				'res': res,
				'type': "success",
				'status': 200
			})

		} catch (error) {
			// 3. Error response
			const errFormat = resolveError(error)
			
			return resolveResponse({
				'res': res,
				'type': "error",
				'values': errFormat
			})
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 */
	handleAuthDetails(req, res) {
		try {
			// 1. Check cookie value
			const accessToken = req.cookies.accessToken;

			if (!accessToken){
				throw ClientSideError("NO_AUTHENTICATION");
			}

			// 2. Check validation
			const authDetails = 
			this.service.validateToken(accessToken);

			return resolveResponse({
				'response': res,
				'type': "success",
				'status': 200,
				'values': {
					'authenticated': true,
					'role': authDetails.role
				}
			});
		} catch(error){
			const errFormat = resolveError(error);

			return resolveResponse({
				'res': res,
				'type': "error",
				'values': errFormat
			})
		}
	}
}