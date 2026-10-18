import { redisClient } from "./redis-client.js"



/** 
 * @param {string} name 
 * @param {string} value 
 * @param {number} exp 
 */
export async function setKeyValue(name, value, exp = null) {
  await redisClient.set(name, value, {
    'expiration': exp ? {
      'type': "EX",
      'value': exp
    } : undefined
  });
}

/**
 * @param {string} name 
 */
export async function getKeyValue(name) {
  return await redisClient.get(name);
}

/**
 * @param {string} name 
 */
export async function delKey(name) {
  return await redisClient.del(name);
}