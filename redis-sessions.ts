import Redis from "ioredis";

const redisSessionsClient = new Redis({
    port:6379,
    host:"172.21.0.2"
});

export default redisSessionsClient;