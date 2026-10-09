// import middlewares


/**
 * 
 * @param {import('express').Application} app
 * @param {import('./controller').default} controller 
 */
export default function setAuthRoutes(app, controller){
  app.post("/api/auth/register", (req, res)=> controller.handleRegister(req, res));
  app.post("/api/auth/login", (req, res)=> controller.handleLogin(req, res));
  app.get("/api/auth/me", (req, res)=> controller.handleAuthDetails(req, res));
}