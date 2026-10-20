import path from "path";
import envSchema from "env-schema";
import schema from "./env-config.js";
import defaultConfigValidators from "./validators/default.js";
import versionsConfigValidators from "./validators/versions.js";
import defaultConfig from "./default.json" with {'type': "json"};
import versionsConfig from "./versions.json" with {'type': "json"};


const __dirname = import.meta.dirname;

export default class AppConfig {

  /**
   * @param {keyof typeof versionsConfig} type
   */
  constructor(type = "dev") {
    this.type = type;

    // placeholders
    this.errs = [];
    this.data = {};
  }


  /**
   * @typedef {import('zod').ZodError} zodErr
   */


  /**
   * @param {Error} err
   */
  #resolveEnvErrField(err){
    switch (err.keyword){
      
      case "type":
        return err.instancePath.replace("/", "")
      case "required":
        return err.params.missingProperty
    }
  }

  /**
   * @param {Error | zodErr} err 
   * @param {"json" | "env"} configType 
   */
  #resolveConfigErrs(err, configType){
    // handle configuration type
    switch (configType) {

      case "env":
        err.errors.forEach(errItem =>{
          this.errs.push({
            'type': "env",
            'field': this.#resolveEnvErrField(errItem),
            'cause': errItem.keyword
          })
        });
        break;

      case "json":
        err.issues.forEach(err => {
          this.errs.push({
            'type': "json",
            'field': err.path.at(-1),
            'cause': err.code
          });
        });
    }
  }

  #resolveErrorsMsg(){
    return this.errs.map(errItem =>(
      `Location: ${errItem.type} | `+
      `Field: ${errItem.field} | ` + 
      `Cause: ${errItem.cause}`
    )).join("\n")
  }

  /**
   * @returns {{
   * 'defaultConfig': object, 'versionConfig': object
   * } | void}
   */
  #validateJsonConfigErrs() {
    // Validate configurations data
    try {
      defaultConfigValidators.default.parse(defaultConfig);

      versionsConfigValidators[this.type].parse(
        versionsConfig[this.type]
      );

      // Return configurations
      this.data.default = defaultConfig;
      this.data.versions = versionsConfig[this.type];

    } catch (error) {
      // Check errors
      this.#resolveConfigErrs(error, "json");
    }
  }

  /**
   * @returns {object | void}
   */
  #validateEnvConfigErrs() {
    try {
      // Validate creds configurations
      const envConfig = envSchema({
        'schema': schema,
        'dotenv': {
          'path': path.join(__dirname, "..", ".env")
        },
      });
      
      // Return creds configurations
      this.data.env = envConfig;

    } catch (error) {
      // Check errors
      this.#resolveConfigErrs(error, "env");
    }
  }

  load() {
    // Get and validate configurations
    this.#validateJsonConfigErrs();
    this.#validateEnvConfigErrs();

    // Check results
    if (this.errs.length > 0){
      console.error(this.#resolveErrorsMsg());
      process.exit(1);
    }
  }
}

const config = new AppConfig("dev");

config.load()

console.log(config.data)