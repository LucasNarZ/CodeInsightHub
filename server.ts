require('module-alias-jest/register')
import express from "express";
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
app.use(express.json());

const port = process.env.HTTP_PORT ?? 4000;


const routes = require('@routes/routes');
const debugRoutes = require("@routes/debugRoutes");

app.use('/api', routes);
app.use('/api/debug', debugRoutes);



let server;
// if(port != 4000){
//     if(cluster.isMaster){
//         for(let i = 0;i < numCPUs; i++){
//             cluster.fork();
//         }
//     }else{
//         server = app.listen(port, () => {
//             console.log("Server is running at port", port);
//         });
//     }
// }else{
//     server = app.listen(port, () => {
//         console.log("Server is running at port", port);
//     });
// }
server = app.listen(port, () => {
    console.log("Server is running at port", port);
});



module.exports = {server, app};
