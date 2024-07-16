import 'module-alias/register';
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';
import bodyParser from 'body-parser';

import RedisStore from 'connect-redis';
import redisSessionClient from './redis-sessions';
import session from "express-session";

import cluster from 'cluster';

const app = express()

dotenv.config();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);

declare module 'express-session' {
    export interface SessionData {
      sessionId: string;
    }
}


const port = process.env.HTTP_PORT ?? 4000;

let redisStore = new RedisStore({
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
        httpOnly: true,
        maxAge: 360000
    }
}));

import routes from '@routes/routes';
import debugRoutes from "@routes/debugRoutes";

app.use('/api', routes);
app.use('/api/debug', debugRoutes);

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
