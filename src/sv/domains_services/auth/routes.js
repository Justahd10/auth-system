import UserRepository from './repository.js';
import AuthService from './services.js';
import AuthController from './controller.js';



// Set domain service layers
const repository = new UserRepository(db);
const services = new AuthService(repository);
const controller = new AuthController(services);



// Domain services routes
const routes = [
  {
    'method': "POST",
    'endpoint': "/api/auth/register",
    'middlewares': [

    ],
    "handler": controller.handleRegister
  },
  {
    'method': "POST",
    'endpoint': "/api/auth/login",
    'middlewares': [

    ],
    "handler": controller.handleLogin
  },
  {
    'method': "GET",
    'endpoint': "/api/auth/me",
    'middlewares': [

    ],
    "handler": controller.handleAuthDetails
  },
  /* {
    'method': "GET",
    'endpoint': "/api/auth/me",
    'middlewares': [

    ],
    "handler": controller.handleAuthDetails
  },
  {
    'method': "GET",
    'endpoint': "/api/auth/me",
    'middlewares': [

    ],
    "handler": controller.handleAuthDetails
  },
  {
    'method': "GET",
    'endpoint': "/api/auth/me",
    'middlewares': [

    ],
    "handler": controller.handleAuthDetails
  } */
];

export default routes