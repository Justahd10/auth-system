import HealthService from "../services/health.js"
import HealthController from "../controllers/health.js"

import { appendTimestamp } from "../middlewares/default.js"



const healthService = new HealthService()
const healthController = new HealthController(healthService)


function setHealthServiceRoutes(app){
    app.get(
        "/health/ping", [appendTimestamp], 
        (req, res)=> healthController.testResponse(req, res)
    )
    
    // ... Other routes
}

export default setHealthServiceRoutes