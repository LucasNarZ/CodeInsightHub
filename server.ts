import 'module-alias/register';
import express from "express";
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
app.use(express.json());

const port = process.env.HTTP_PORT ?? 4000;

import routes from '@routes/routes';
import debugRoutes from "@routes/debugRoutes";

app.use('/api', routes);
app.use('/api/debug', debugRoutes);


let server:any;
if(port != 4000){
    if(cluster.isMaster){
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
