import redisSessionClient from "../../../redis-sessions";
import { v4 } from "uuid";


export default async (req:ExpressRequest, userId:string) => {
    req.session.sessionId = v4();
    await redisSessionClient.set(req.session.sessionId, userId);
}