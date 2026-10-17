import { createClient } from "redis";



/*
    Client setting
*/
export const redisClient = createClient({
  'url': process.env.REDIS_URL
});

/*
    Events handling
*/
redisClient.on('ready', ()=>{
  console.log("Redis connection created.")
})
redisClient.on('error', (err)=>{
  console.log("Error: redis exception:", err)
})
redisClient.on('end', ()=>{
  console.log("Redis connection fineshed")
})

/*
    Connection handling
*/
export const redisConnect = async ()=>{
  await redisClient.connect();
};
export const redisQuit = async ()=>{
  await redisClient.quit();
};
