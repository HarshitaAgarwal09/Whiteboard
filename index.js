//SERVER SIDE


const express = require("express");

//express server
const app = express();

//nodejs
const server = require("http").Server(app);


// serve static assets to client
app.use(express.static("src"));

//nodejs server
const port = process.env.PORT || 3000;

server.listen(port, function (req, res) {
    console.log("Server started at port 3000");
});