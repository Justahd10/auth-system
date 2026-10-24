/**
 * @typedef {import('./EnvConfig').default} EnvConfig
 */
/**
 * @typedef {import('./JsonConfig').default} JsonConfig
 */

export default class ConfigRegister {
  // Start errors format
  #errs = [];

  /**
   * @param {Array<EnvConfig | JsonConfig>} configs 
   */
  constructor(configs) {
    this.configs = configs;
    this.data = new Map();
  }

  #resolveErrorsMsg() {
    return this.#errs.map(errItem => (
      `Type: ${errItem.type} | ` +
      `Location: ${errItem.location} | ` +
      `Issue: ${errItem.issue}`
    )).join("\n")
  }

  /**
   * @param {string} name 
   * @param {object} data 
   */
  #addConfig(name, data) {
    // Verify if alredy exists
    if (!this.data.has(name)) {
      this.data.set(name, data);
    }

    else {
      this.#errs.push({
        'type': "registry",
        'location': name,
        'issue': "name conflict"
      })
    }
  }

  #validateConfigs() {
    this.configs.forEach(config => {
      // parse
      const parsed = config.parse();

      // Verify issues
      if (parsed.errors){
        this.#errs = [...this.#errs, ...parsed.errors];
      };

      // Verify validated data
      if (parsed.data) {
        this.#addConfig(config.name, parsed.data);
      }
    })
  }

  load() {
    // Validate configurations
    this.#validateConfigs();

    // Handle errors
    if (this.#errs.length) {
      return {
        'success': false,
        'errors': this.#resolveErrorsMsg()
      }
    };

    return {
      'success': true,
      'errors': null
    }
  }
}