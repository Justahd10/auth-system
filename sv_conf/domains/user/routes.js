// import middlewares



export default function setUsersRoutes(app, controller){
    app.post("/api/auth/register", (req, res)=> controller.handleRegister(req, res));
    app.post("/api/auth/login", (req, res)=> controller.handleLogin(req, res));
}