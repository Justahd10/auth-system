// import middlewares



export default function setUsersRoutes(app, controller){
    app.post("/auth/register", (req, res)=> controller.handleRegister(req, res))
}