import Redis from "ioredis";

const redisSessionsClient = new Redis();

redisSessionsClient.connect().catch(err => console.error(err));





export default redisSessionsClient;