import UserRepository from "./repository.js";
import UserService from "./services.js";
import UserController from "./controller.js";
import setUsersRoutes from "./routes.js";



export default function setUsersDomain(app, db){
    const userRepository = new UserRepository(db)
    const userService = new UserService(userRepository)
    const userController = new UserController(userService)

    setUsersRoutes(app, userController)
}