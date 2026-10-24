import { envSchema } from "env-schema";



export default class EnvConfig {
  /**
   * @param {string} envPath 
   * @param {object} envSchema
   * @param {string} name
   */
  constructor(envPath, envSchema, name) {
    this.envPath = envPath;
    this.envSchema = envSchema;
    this.name = name;
  }


  #resolveEnvErr(errItem) {
    // Start passing code
    const err = {
      'type': "env",
      'issue': errItem.keyword
    };

    // Handle error field
    switch (errItem.keyword) {
      case "required":
        err.location =
          errItem.params.missingProperty;
        break;

      case "type":
        err.location =
          errItem.instancePath.replace("/", "");
    }

    return err;
  }

  /**
   * @param {Error} error 
   */
  #handleErr(error) {
    if (!error.errors) {
      return [{
        'type': "env",
        'location': error.name,
        'issue': error.message
      }]

    } else {
      return error.errors.map(
        err => this.#resolveEnvErr(err)
      )
    }
  }

  /**
   * @returns {import('./types.js').ParsedConfig}
   */
  parse() {
    // Start result format
    const result = {
      'data': null,
      'errors': null
    };

    try {
      // validate configurations and return
      result.data = envSchema({
        'schema': this.envSchema,
        'dotenv': {
          'path': this.envPath
        }
      })

    } catch (error) {
      // Append errors
      result.errors = this.#handleErr(error);
    }

    return result
  }
}