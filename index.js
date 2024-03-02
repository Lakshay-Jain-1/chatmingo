const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("node:path");
const user = require("./models/user");

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("endpoint", async (msg) => {
    socket.endpoint = msg.receiver;
    console.log("Updated", socket.endpoint);
    try {
      await user.create({
        endpoint: socket.endpoint,
        receiver: null,
        messages: [],
      });
      console.log("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  socket.on("joinroom", async (msg) => {
    socket.leave(socket.room)
    socket.room = msg.room;
    socket.join(socket.room);
    console.log("Updated", socket.room);
    //created an receiver point took all cases in account
    try {
      const User = await user.findOne({ endpoint: socket.endpoint });
      if (User.receiver == null) {
        User.receiver = socket.room;
        const updatedchat = await user.findOneAndUpdate(
          { endpoint: socket.endpoint, receiver: null },
          User
        );
      } else {
        await user.create({
          endpoint: socket.endpoint,
          receiver: socket.room,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("message", async (msg) => {
    const User = await user.findOne({
      endpoint: socket.endpoint,
      receiver: socket.room,
    });
    User.messages.push(msg.text);
    const updatedmessages = await user.findOneAndUpdate(
      { endpoint: socket.endpoint, receiver: socket.room },
      User
    );

    console.log(socket.room);
    io.to(socket.room).emit("message_recieved", {
      message: msg.text,
    });
  });
});
server.listen("4000");
