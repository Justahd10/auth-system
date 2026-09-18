// import middlewares



export default function setHealthRoutes(app, controller){
    app.get(
        "/health/ping", 
        (req, res)=> controller.testResponse(req, res)
    )
    
    // Routes ...
}
