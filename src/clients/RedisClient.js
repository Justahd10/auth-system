import { createClient } from "redis";



/** @typedef {import('redis').RedisClientType | null} redisClient */


class RedisClient {

  /**
   * @param {string} url 
   * @param {string} usrname 
   * @param {string} pass 
   */
  constructor(
    url,
    usrName,
    pass
  ) {
    this.url = url;
    this.usrName = usrName;
    this.pass = pass;

    /** @type {redisClient} */
    this.client = null;
  }

  async create() {
    console.log("Creating redis session...");

    client = createClient({
      'url': this.url,
      'username': this.usrName,
      'password': this.pass
    });
    
    await client.connect();
  }

  /**
   * @param {string} name 
   * @param {string} value 
   * @param {number | null} exp 
   */
  async setKeyValue(name, value, exp = null) {
    await client.set(name, value, {
      'expiration': exp ? {
        'type': "EX",
        'value': exp
      } : undefined
    });
  }

  /**
   * @param {string} name 
   */
  async getKeyValue(name) {
    return await this.client.get(name);
  }

  /**
   * @param {string} name 
   */
  async delKey(name) {
    return await this.client.del(name);
  }

  /**
   * @param {string | undefined} msg 
   */
  async verify(msg = undefined) {
    console.log("Testing redis session...");

    await this.client.ping(msg)
  }

  /**
   *  @returns {Promise<string>}
   */
  async quit() {
    console.log("Closing redis session...");

    const result = await this.client.quit();
  }
};

const redis = new RedisClient();

export default redis;