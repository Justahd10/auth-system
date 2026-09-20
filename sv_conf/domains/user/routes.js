// import middlewares



export default function setUsersRoutes(app, controller){
    app.post("/auth/register", (req, res)=> controller.handleRegister(req, res));
    app.post("/auth/login", (req, res)=> controller.handleLogin(req, res));
}