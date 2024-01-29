const express = require("express");
const app = express();

// Socket.io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
// 


const saveGlobalChats = require("./saveGlobalChats");
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
// app.use(cors({ credentials: true, origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })
require("./db/connect");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(require("./router/routes"));





//  Socket.io  Starts
const io = new Server(server, {
    cors: {
        origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

// socket means user
io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (roomId) => {
        console.log("Joined ", roomId);
        socket.join(roomId);
    })

    socket.on("send_message", async ({ message, roomId, sender }) => {
        console.log(message, roomId, sender);
        socket.to(roomId).emit("message_received", { sender, message });
        await saveGlobalChats(message, sender, roomId);
    });

    socket.on("leave_room", (roomId) => {
        console.log("Left ", roomId);
        socket.leave(roomId);
    });
});

// End

server.listen(PORT, () => {
    console.log("Running on port ", PORT);
})

// app.listen(PORT, () => {
//     console.log("Running on port ", PORT);
// })