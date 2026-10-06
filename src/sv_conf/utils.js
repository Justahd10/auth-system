// helper function
export function returnRes(statusCode, res){
    return res.status(statusCode).json(res.locals.payload)
}


export function prepareResponse({ type = "success", response, values }){
    switch(type){
        case "error":
            response.locals.payload.status = "unsuccessful";
            response.locals.payload.error = values.error;
            break;

        case "success":
            if (values){
                response.locals.payload.data ={
                    ...response.locals.payload.data,
                    ...values
                }
                break;
            }
    }
}

export function sendErrorResponse(err, controller, res){
    prepareResponse({
        'type': "error",
        'response': res,
        'values': { 'error': err.message}
    })
    
    const code = controller.Errors[err.cause?.type] ?? 500
    return res.status(code).json(res.locals.payload)
}

export function setAuthCookie(type = "access", response, token){
    // 1. Define default values
    let expMinutes = 30;
    let name = "access_token"

    // 2. check cookie type
    if (type === "refresh"){
        expMinutes = 60;
        name = "refresh_token";
    }
    
    // 3. Set cookie
    response.cookie(name, token, {
        'sameSite': true,
        'httpOnly': true,
        'maxAge': 1000 * 60 * expMinutes 
    })
}