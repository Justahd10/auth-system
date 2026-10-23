import envSchema from "env-schema";
import schema from "./env-config.js";
import defaultConfigValidators from "./validators/default.js";
import versionsConfigValidators from "./validators/versions.js";
import defaultConfig from "./default.json" with {'type': "json"};
import versionsConfig from "./versions.json" with {'type': "json"};



const __dirname = import.meta.dirname;

const templatePath = path.join(__dirname, "email_templates");

export default class AppConfig {
  #errs = [];

  #errsResolvers = {
    /**
     * @param {Error} err 
     */
    'json': (err) => err.errors.forEach(errItem => {
      this.#errs.push({
        'type': "env",
        'field': this.#resolveEnvErrField(errItem),
        'cause': errItem.keyword
      })
    }),

    /**
     * @param {Error} err 
     */
    'env': (err) => err.issues.forEach(err => {
      this.#errs.push({
        'type': "json",
        'field': err.path.at(-1),
        'cause': err.code
      });
    })
  }


  /**
   * @param {keyof typeof versionsConfig} type
   */
  constructor(type = "dev") {
    this.type = type;

    // placeholders
    this.data = {};
  }


  /**
   * @typedef {import('zod').ZodError} zodErr
   */

  /**
   * @param {Error} err
   */
  #resolveEnvErrField(err) {
    switch (err.keyword) {

      case "type":
        return err.instancePath.replace("/", "")
      case "required":
        return err.params.missingProperty
    }
  }

  #resolveErrorsMsg() {
    return this.#errs.map(errItem => (
      `Location: ${errItem.type} | ` +
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
      this.data.defaultConfig = defaultConfig;
      this.data.version = versionsConfig[this.type];

    } catch (error) {
      // Check errors
      this.#errsResolvers.json(error);
    }
  }

  /**
   * @returns {object | void}
   */
  #validateEnvConfigErrs() {
    try {
      // 1. Validate creds configurations
      const envConfig = envSchema({
        'schema': schema,
        'dotenv': {
          'path': path.join(__dirname, "..", ".env")
        },
      });

      // 2. Return creds configurations
      this.data.envConfig = envConfig;

    } catch (error) {
      // 3. Check errors
      this.#errsResolvers.env(error);
    }
  }

  /**
   * @param {string[]} files 
   */
  #appendHtmlContent(files) {
    // 1. Create key into config
    this.data.emailTemplates = Object.fromEntries(
      files.map(file => [
        file.replace(".html", ""),
        fs.readFileSync(
          path.join(templatePath, file), {
          'encoding': "utf-8"
        }
        )
      ])
    );
  }

  load() {
    // Get and validate configurations
    this.#validateJsonConfigErrs();
    this.#validateEnvConfigErrs();

    // Check results
    if (this.#errs.length > 0) {
      console.error(this.#resolveErrorsMsg());
      process.exit(1);
    }
  }
}