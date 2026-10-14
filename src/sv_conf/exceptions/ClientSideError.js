// Validation errors configurations
import errorConfig from "./config.json" with {'type': "json"};



// Error codes array building
const errorCodes = [];

Object.keys(errorConfig).forEach(codeName => {
  if (!errorCodes.includes(codeName)) errorCodes.push(codeName)
});


// Application validation errors handler
class ClientSideError extends Error {

  /**
   * @param {typeof errorCodes[number]} errorCode
   * @param {array} errItems
   */
  constructor(errorCode, errItems = []) {
    super(errorCode);
    this.name = "ClientSideError";
    this.errorCode = errorCode;

    const errConf = errorConfig[this.errorCode];

    this.status = errConf.status;
    this.type = errConf.type;
    this.errItems = errItems;
  }
}

export default ClientSideError;