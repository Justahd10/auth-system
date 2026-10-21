// import middlewares



/**
 * @param {import('express').Application} app 
 * @param {import('./controller').default} controller 
 */
export default function setHealthRoutes(app, controller){
    app.get(
        "/health/ping", 
        (req, res, next)=> controller.testResponse(req, res, next)
    )
}
