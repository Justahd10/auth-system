import UserRepository from "./repository.js";
import AuthService from "./services.js";
import AuthController from "./controller.js";
import setAuthRoutes from "./routes.js";



export default function setAuthDomain(app, db){
    const authRepository = new UserRepository(db)
    const authService = new AuthService(authRepository)
    const authController = new AuthController(authService)

    setAuthRoutes(app, authController)
}