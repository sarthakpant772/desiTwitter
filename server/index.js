require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const http = require("http"); // Importing http module
const { Server } = require("socket.io"); // Importing socket.io

const auth = require("./middleware/auth");
const app = express();
const server = http.createServer(app); // Creating HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://buzztweets.netlify.app/"],
    methods: ["GET", "POST"],
  },
}); // Creating Socket.io server instance

app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "64mb" }));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

const uploadRoute = require("./routes/upload");
app.use("/upload", uploadRoute);

const authRoute = require("./routes/auth");
app.use("/user", authRoute);

const userAction = require("./routes/userAction");
app.use("/action", userAction);

const post = require("./routes/post");
const UserSchema = require("./model/UserSchema");
app.use("/post", post);

const chat = require("./routes/chat");

app.use("/chat", chat);

// Socket.io connection

function generateRoomId(senderId, receiverId) {
  console.log(senderId, receiverId);
  // Sorting the IDs to ensure consistency in generating the room ID
  const sortedIds = [senderId, receiverId].sort();
  return `${sortedIds[0]}` + "thuisasecretgeneratedkey" + `${sortedIds[1]}`;
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Example of handling a chat event
  socket.on("join", ({ senderId, receiverId }) => {
    const roomId = generateRoomId(senderId, receiverId);
    console.log(roomId);
    socket.join(roomId);
  });

  socket.on("send", ({ senderId, receiverId, msg }) => {
    // Emit message to all users in the room
    // socket.join(roomId);
    // socket.emit("check");
    // io.emit(`${roomId}smsdirect`, msg);
    const roomId = generateRoomId(senderId, receiverId);

    socket.to(roomId).emit("recievedMsg", { senderId: senderId, msg: msg });
    console.log(`Message from ${senderId} to ${roomId}: ${msg}`);
  });

  // Add listener for custom event
  socket.on("customEvent", (data) => {
    console.log("Received custom event:", data);
    // Handle the custom event here
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("bufferCommands", true);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connected");
    server.listen(PORT, () => {
      // Start listening on the HTTP server instead of app
      console.log("server is running at port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
