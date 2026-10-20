import { createClient } from "redis";


let redisClient;

/**
 * @param {string} url 
 * @param {string} usrname 
 * @param {string} pass 
 */
export async function setRedisClient(url, usrname, pass) {
  console.log("Creating redis database service client...");
  redisClient = createClient({
    'url': url,
    'username': usrname,
    'password': pass
  })

  redisClient.connect();
}

/**
 * @param {string | undefined} msg 
 */
export async function testRedisClient(msg = undefined) {
  console.log("Testing reds database connection...")
  redis.ping(msg)
}

/**
 * 
 */
export async function closeRedisClient() {
  console.log("Closing redis database service connection...");
  redisClient.quit();
}

export default redisClient;