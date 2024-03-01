
const express = require("express")
const {createServer} = require("http")
const {Server} = require("socket.io")
const {join}=require("node:path")

const app = express()
const server=  createServer(app)
const io = new Server(server)
 
app.use(express.static('public'))
app.get("/",(req,res)=>{
  res.sendFile(join(__dirname,"index.html"))
})
io.on("connect",(socket)=>{
    console.log("user connected")
})
server.listen("4000")

