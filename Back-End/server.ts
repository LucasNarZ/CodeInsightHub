import 'module-alias/register';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';
import passport from 'passport';
import RedisStore from 'connect-redis';
import redisSessionClient from './redis-sessions';
import session from "express-session";
import Pessoa from '@models/Pessoas';
import Admin from '@models/Admin';

import cluster from 'cluster';
passport.initialize();
const app = express()

dotenv.config();
app.use(helmet());
app.use(cors({
    origin:"http://localhost",
    credentials:true
}));
app.use(express.json());
app.set('trust proxy', 1);

declare module 'express-session' {
    export interface SessionData {
      userId: string;
    }
}

const port = process.env.HTTP_PORT ?? 4000;

const redisStore = new RedisStore({
    client: redisSessionClient,
});

app.use(session({
    name:"sessionId",
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        domain:"localhost",
        httpOnly:true,
        maxAge: 360000,
        sameSite:"strict"
    }
}));

import routes from '@routes/routes';
import debugRoutes from "@routes/debugRoutes";

app.use('/api', routes);
app.use('/api/debug', debugRoutes);

//good code yeah

//a really good code
const numCPUs = 4;
let server:any;
if(port != 4000){
    if(cluster.isPrimary){
        for(let i = 0;i < numCPUs; i++){
            cluster.fork();
        }
    }else{
        server = app.listen(port, () => {
            console.log("Server is running at port", port);
        });
    }
}else{
    server = app.listen(port, () => {
        console.log("Server is running at port", port);
    });
}
// server = app.listen(port, () => {
//     console.log("Server is running at port", port);
// });

export {server, app};
