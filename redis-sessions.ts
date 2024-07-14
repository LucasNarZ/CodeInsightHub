import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const url:string = process.env.REDIS_URL;

const redisSessionsClient = createClient({url});
(async () => {
    await redisSessionsClient.connect();
})();

redisSessionsClient.on('error', err => console.log('Redis Client Error', err));




export default redisSessionsClient;