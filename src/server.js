const express = require("express");
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

app.use(express.json());

const port = 4000;

const baseUrl = "http://localhost:9999"

const routes = require('./routes');
const debugRoutes = require("./debugRoutes");

app.use('/api', routes);
app.use('/api', debugRoutes);
let server;
if(cluster.isMaster){
    for(let i = 0;i < numCPUs; i++){
        cluster.fork();
    }
}else{
    server = app.listen(port, () => {
        console.log("Server is running at port", port);
    });
}



module.exports = {server, baseUrl};
