import { ZodError } from 'zod';



export default class JsonConfig {
  /**
   * @param {object} jsonContent 
   * @param {import('zod').ZodType} jsonSchema
   * @param {string} name
   */
  constructor(jsonContent, jsonSchema, name) {
    this.jsonContent = jsonContent;
    this.jsonSchema = jsonSchema;
    this.name = name;
  }


  #resolveJsonErr(errItem) {
    // Return error format
    return {
      'type': "json",
      'issue': errItem.code,
      'location': errItem.path.join(" > "),
    }
  }

  #handleErr(error) {
    if (error instanceof ZodError) {
      return error.issues.map(
        err => this.#resolveJsonErr(err)
      )

    } else {
      return [{
        'type': "json",
        'location': error.name,
        'issue': error.message
      }]
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
      result.data = this.jsonSchema.parse(
        this.jsonContent
      );

    } catch (error) {
      // handle errors
      result.errors = this.#handleErr(error);
    }

    return result
  }
}