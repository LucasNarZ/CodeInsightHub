import Redis from "ioredis";

const redisSessionsClient = new Redis({
    host:"redis-sessions"
});

export default redisSessionsClient;