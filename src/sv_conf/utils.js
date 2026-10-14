/**
 * @typedef {object} ResponseResolverInterface
 * @property {import('express').Response} res
 * @property {"success" | "error"} type
 * @property {number} status
 * @property {object | null} values
 */

/**
 * @param {ResponseResolverInterface} param0
 */
export function resolveResponse({
  res, type = "success", status = 200, values = null })
  {
    switch(type){
      
      // values as error format
      case "error":
        res.locals.payload.status = "unsuccessful";
        res.locals.payload.error = values;

        return res.status(values.status).json(
          res.locals.payload
        );

      // values as data
      case "success":
        res.locals.payload.data ={
          ...res.locals.payload.data,
          ...values
        }
    };

  return res.status(status).json(
    res.locals.payload
  );
}

/**
 * @param {Error | import('./exceptions/ClientSideError').default} err 
 */
export function resolveError(err){
  if (err.name !== "ClientSideError"){
    return {
      'status': 500,
      'code': "INTERNAL_ERROR"
    }
  };

  return {
    'type': err.type,
    'status': err.status,
    'code': err.errorCode,
    'errors': err.errItems
  }
}

/**
 * @param {"access" | "refres"} type 
 * @param {import('express').Response} res
 * @param {string} token
 */
export function setAuthCookie(type = "access", res, token) {
  // 1. Define default values
  let expMinutes = 30;
  let name = "access_token"

  // 2. check cookie type
  if (type === "refresh") {
    expMinutes = 60;
    name = "refresh_token";
  }

  // 3. Set cookie
  res.cookie(name, token, {
    'sameSite': true,
    'httpOnly': true,
    'maxAge': 1000 * 60 * expMinutes
  })
}