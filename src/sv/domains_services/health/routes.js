import HealthService from "./services.js";
import HealthController from "./controller.js";



const services = new HealthService();
const controller = new HealthController(services);

const routes = [
    {
        'method': "GET",
        'endpoint': "/api/health/ping",
        'middlewares': [

        ],
        'handler': controller.testResponse
    }
];

export default routes