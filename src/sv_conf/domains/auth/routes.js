// import middlewares



/**
 * @param {import('express').Application} app
 * @param {import('./controller').default} controller 
 */
export default function setAuthRoutes(app, controller){
  app.post(
    "/api/auth/register", 
    (req, res, next)=> controller.handleRegister(req, res, next)
  );
  app.post(
    "/api/auth/login", 
    (req, res, next)=> controller.handleLogin(req, res, next)
  );
  app.get(
    "/api/auth/me", 
    (req, res, next)=> controller.handleAuthDetails(req, res, next)
  );
  
  /* app.post(
    "/api/auth/email/:sessionToken/verify", 
    (req, res)=> controller.handleEmailConfirmation
  ) */
  /* app.post(
    "/api/auth/email/:sessionToken/resend", 
    (req, res)=> controller.handleEmailConfirmation
  ) */
  /* app.post(
    "/api/auth/email/:sessionToken/confirm", 
    (req, res)=> controller.handleEmailConfirmation
  ) */
}