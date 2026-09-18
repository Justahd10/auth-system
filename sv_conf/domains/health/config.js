import HealthService from "./services.js";
import HealthController from "./controller.js";
import setHealthRoutes from "./routes.js";



export default function setHealthDomain(app, db = null){
    const healthService = new HealthService(db)
    const healthController = new HealthController(healthService)
    
    setHealthRoutes(app, healthController)
}