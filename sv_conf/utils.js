export function prepareResponse({ type = "success", response, values }){
    switch(type){
        case "error":
            response.locals.format.status = "unsuccessful";
            response.locals.format.error = values.error;
            break;

        case "success":
            response.locals.format.data ={
                ...response.locals.format.data,
                ...values
            }
            break;
    }
}
