const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const hashRoomId = (userId1, userId2) => {
  return crypto
    .createHash("sha256")
    .update([userId1, userId2].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinChat", ({ userId, targetUser }) => {
      const roomId = hashRoomId(userId, targetUser);
      socket.join(roomId);
      console.log(`${userId} joined room: ${roomId}`);
    });

    socket.on("sendMessage", async ({ userId, targetUser, newMessage }) => {
      try {
        const validConnection=ConnectionRequest.findOne({
            $or:[{fromUser:userId, toUser:targetUser, status:"accepted"},
                {fromUser:targetUser, toUser:userId, status:"accepted"}
            ]
        })
        if(!validConnection) {
            console.error("Connection not valid for message sending");
            return;
            }
        const { text, timestamp } = newMessage;
        const roomId = hashRoomId(userId, targetUser);

        console.log(`Message received from ${userId} to ${targetUser}:`, newMessage);

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUser] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUser],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();

        io.to(roomId).emit("receivedMessage", { newMessage });
        console.log(`Message emitted to room ${roomId}`);
      } catch (err) {
        console.error("Error in sendMessage:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
