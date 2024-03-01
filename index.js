const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("node:path");

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("endpoint", (msg) => {
    socket.endpoint = msg.receiver;
    console.log("Updated", socket.endpoint);
  });

  socket.on("joinroom", (msg) => {
    socket.room = msg.room;
    console.log("Updated", socket.room);
  });
});
server.listen("4000");
