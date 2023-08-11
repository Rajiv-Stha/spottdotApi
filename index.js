const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
require("./utils/db")();
app.use(express.json());

// console.log(process.env.MONGO_URI);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
app.use(
  cors({
    origin: ["http://localhost", "http://localhost:3000"],
  })
);

require("./routes/AllRoutes")(app);

require("./utils/socket")(io);

server.listen(8000, () => console.log(`server started at port 8000`));
