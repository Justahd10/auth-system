import { createClient } from "redis";



let client;


class RedisClient {

  /**
   * @param {string} url 
   * @param {string} usrname 
   * @param {string} pass 
   */
  async create(url, usrname, pass) {
    console.log("Creating redis session...");
    client = createClient({
      'url': url,
      'username': usrname,
      'password': pass
    });
    
    await client.connect();
  }

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
    return await client.get(name);
  }

  /**
   * @param {string} name 
   */
  async delKey(name) {
    return await client.del(name);
  }

  /**
   * @param {string | undefined} msg 
   */
  async verify(msg = undefined) {
    console.log("Testing redis session...");
    await client.ping(msg)
  }

  /**
   *  @returns {Promise<string>}
   */
  async quit() {
    console.log("Closing redis session...");
    const result = await client.quit();
  }
};

const redis = new RedisClient();

export default redis;