//SERVER SIDE


const express = require("express");

//express server
const app = express();

//nodejs
const server = require("http").Server(app);

//nodejs enable socket
const io = require("socket.io")(server);

// serve static assets to client
app.use(express.static("src"));

//server
io.on("connect", function (socket) {
    console.log(socket.id);
    //rest code;////////////////////////
})

//nodejs server
const port = process.env.PORT || 3000;

server.listen(port, function (req, res) {
    console.log("Server started at port 3000");
});