/*
    The counter is storaged in backend memory
    Redis data base is better for big systems

    // Example of rate limit memory structure
    const ratemapper ={
        "192.168.10.1": {
            'totalAccess': 0,
            'lastAccess': 2026-09-20T01:45:36.485Z
        }
    }
*/
import { prepareResponse } from "../utils.js";



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

    #appendCounter(ip){
        const origin = this.#ratemapper[ip];
        origin.totalAccess = origin.totalAccess + 1;
    }

    #resetCounter(ip){
        const origin = this.#ratemapper[ip];
        origin.totalAccess = 0;
    }

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


export default function validateRateLimit(req, res, next){
    // Access IP of the origin device
    // and verify the rate limiit
    if (!rateLimit.verifyAccessLimit(req.ip)){
        // return Too Many Request
        prepareResponse({
            'response': res,
            'type': "error",
            'values': {'error': "Too many requests"},
        })

        return res.status(429).json(res.locals.payload)
    }

    next()
}