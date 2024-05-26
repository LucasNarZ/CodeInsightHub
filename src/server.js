const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;

const routes = require('./routes');
const debugRoutes = require("./debugRoutes");

app.use('/api', routes);
app.use('/api', debugRoutes);

let server = app.listen(port, () => {
    console.log("Server is running at port", port);
});

module.exports = {app, server};
