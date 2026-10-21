import { createClient } from "redis";



let client;


class RedisClient {

  /**
   * @param {string} url 
   * @param {string} usrname 
   * @param {string} pass 
   */
  async connect(url, usrname, pass) {
    console.log("Creating redis database service client...");
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
    console.log("Testing reds database connection...");
    /* test connection */
  }

  quit() {
    console.log("Closing redis database service connection...");
    client.quit();
  }
};

const redis = new RedisClient();

export default redis;