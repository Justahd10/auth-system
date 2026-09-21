export function prepareResponse({ type = "success", response, values }){
    switch(type){
        case "error":
            response.locals.format.status = "unsuccessful";
            response.locals.format.error = values.error;
            break;

        case "success":
            if (values){
                response.locals.format.data ={
                    ...response.locals.format.data,
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
    return res.status(code).json(res.locals.format)
}