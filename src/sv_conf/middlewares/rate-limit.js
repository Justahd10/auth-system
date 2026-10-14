import ClientSideError from '../exceptions/ClientSideError.js'



/**
 * @typedef {string} IpAddress
 */

/**
 * Validate rate limit for each request
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next
 * @example
 * // Example of rate limit memory structure
    const ratemapper ={
        "192.168.10.1": {
            'totalAccess': 0,
            'lastAccess': "2026-09-20T01:45:36.485Z"
        }
    }
 */
class RateLimit{
    #ratemapper = {}
    #limit = 5

    constructor(){
        this.#ratemapper
    }

    #calc(accessTimestamp){
        return ((new Date(Date.now()) - accessTimestamp) / 1000
        ).toFixed(1)
    }

    /**
     * @param {IpAddress} ip 
     */
    #appendCounter(ip){
        const origin = this.#ratemapper[ip];
        origin.totalAccess = origin.totalAccess + 1;
    }

    /**
     * @param {IpAddress} ip 
     */
    #resetCounter(ip){
        const origin = this.#ratemapper[ip];
        origin.totalAccess = 0;
    }

    /**
     * @param {IpAddress} ip 
     */
    #getOrigin(ip){
        let origin = this.#ratemapper[ip];

        if (!origin){
            origin = this.#ratemapper[ip] ={
                'totalAccess': 0,
                'lastAccess': new Date(Date.now())
            }
        }

        return origin
    }

    /**
     * @param {IpAddress} ip 
     */
    verifyAccessLimit(ip){
        const origin = this.#getOrigin(ip);
        
        const seconds = this.#calc(origin.lastAccess)
        if (seconds >= 60){
            this.#resetCounter(ip)
            origin.lastAccess = new Date(Date.now())
        }

        if (origin.totalAccess < this.#limit){
            this.#appendCounter(ip);

            return true
        } else {
            return false
        }
    }
}


const rateLimit = new RateLimit()

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export default function validateRateLimit(req, res, next){
    // Access IP of the origin device
    // and verify the rate limiit
    if (!rateLimit.verifyAccessLimit(req.ip)){
        throw ClientSideError('MANY_REQUESTS')
    }

    next()
}