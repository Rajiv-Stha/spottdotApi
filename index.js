const express= require("express")
const app = express();
const http = require("http")
const server = http.createServer(app)
 const {Server} = require("socket.io")
 const cors =require("cors")

 const io = new Server(server,{
    cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost",
      "http://localhost:3000",
    ],    
    methods: ["GET", "POST","PUT"],
    credentials: true,
  },    
 })
 app.use(cors({
     origin:["http://localhost","http://localhost:3000"],

 }))

require("./utils/socket")(io)



server.listen(8000,()=>console.log(`server started at port 8000`))
