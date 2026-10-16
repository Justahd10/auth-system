import { UnauthorizedError } from "../../exceptions/ClientSideError.js"
import { resolveResponse, setAuthCookie } from "../../utils.js"



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
	 * @param {import('express').NextFunction} 
	 */
	async handleRegister(req, res, next) {
		try {
			// 1. Try get email confirmation sesstion token
			const sessionToken = await this.service.registerAccount(
				req.body.email, req.body.password
			);

			// 2. Response with session token
			return resolveResponse({
				'res': res,
				'type': "success",
				'status': 200,
				'values': {
					'sessionToken': sessionToken
				}
			});
		} catch(err){ next(err) }
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @param {import('express').NextFunction} next
	 */
	async handleLogin(req, res, next) {
		try {
			// 1. Try access account data
			const accessToken = 
			await this.service.accessAccount(
				req.body.email, req.body.password
			)

			// 2. Prepare credentials
			setAuthCookie("acess", res, accessToken)

			return resolveResponse({
				'res': res,
				'type': "success",
				'status': 200
			})
		} catch(err){ next(err) }
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next 
	 */
	handleAuthDetails(req, res, next) {
		try {
			// 1. Check crendetials cookie
			const accessToken = req.cookies.accessToken;

			if (!accessToken){
				throw new UnauthorizedError({
					'errCode': "NO_AUTHENTICATION"
				});
			}

			// 2. Check credentials content
			const authDetails = 
			this.service.validateToken(accessToken);

			return resolveResponse({
				'res': res,
				'type': "success",
				'status': 200,
				'values': {
					'authenticated': true,
					'role': authDetails.role
				}
			});
		} catch(err){ next(err) }
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next 
	 */
	handleEmailConfirmation(req, res, next){
		try {
			// 1. handle path parameters


				// 2. verify


				// 2. resend


				// 2. confirm
		} catch(error){ next(err) }
	}
}