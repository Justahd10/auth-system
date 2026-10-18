const errCodes = [
  "INVALID_CREDENTIALS", "NO_AUTHENTICATION",
  "EMAIL_CONFLICT", "TOO_MANY_REQUESTS"
]


/*
    Errors handling - Classes structure
*/

/**
 * @typedef {object} ClientSideErrorInterface
 * @property {string} errCode
 * @property {array} errItems
 */


class ClientSideError extends Error{

  /**
   * @param {ClientSideErrorInterface} param0
   */
  constructor({errCode, errItems = []}) {
    super(errCode);

    this.name = "ClientSideError";
    this.errItems = errItems;
  }
}


export class UnauthorizedError extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 401;
  }
}

export class UnprocessableEntity extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 422;
  }
}

export class ConflictError extends ClientSideError{

  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 409;
  }
}

export class ManyRequestsError extends ClientSideError{
  
  /**
   * @param {ClientSideErrorInterface} param0 
   */
  constructor({errCode, errItems = []}){
    super(errCode, errItems);

    this.status = 429;
  }
}
