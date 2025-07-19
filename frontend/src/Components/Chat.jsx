import React, { useState, useEffect, useRef } from 'react';
import LeftChat from "./LeftChat";
import RightChat from "./RightChat";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messageBox = useRef(null);

  useEffect(() => {
    if (!selectedConnection) return;

    const fetchChat = async () => {
      try {
        const chat = await axios.get(`${BASE_URL}/chat/${selectedConnection._id}`, {
          withCredentials: true,
        });

        const chatMessages = chat?.data?.messages.map((msg) => ({
          senderId: msg.senderId._id,
          text: msg.text,
          timestamp: msg.createdAt || new Date().toISOString(),
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
        }));

        setMessages(chatMessages);
      } catch (err) {
        console.error("Error fetching chat:", err);
      }
    };

    fetchChat();
    setNewMessage("");
  }, [selectedConnection]);

  useEffect(() => {
    messageBox.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId || !selectedConnection) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinChat", { userId, targetUser: selectedConnection._id });
    });

    socket.on("receivedMessage", ({ newMessage }) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, selectedConnection]);

  const sendMessage = () => {
  if (!newMessage.trim() || !socketRef.current) return;

  const timestamp = new Date().toISOString();
  const messageData = {
    senderId: userId,
    text: newMessage,
    timestamp,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  socketRef.current.emit("sendMessage", {
    userId,
    targetUser: selectedConnection._id,
    newMessage: messageData,
  });

  setNewMessage("");
};


  return (
    <div className="flex flex-col md:flex-row h-screen min-h-screen overflow-hidden">
      {/* Left Chat Section */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full border-r border-gray-300 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 overflow-y-auto">
        <LeftChat onSelect={setSelectedConnection} selectedConnection={selectedConnection} />
      </div>

      {/* Right Chat Section */}
      <div className="w-full md:w-2/3 lg:w-3/4 h-1/2 md:h-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        {selectedConnection ? (
          <RightChat
            connection={selectedConnection}
            messages={messages}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            messageBox={messageBox}
            onBack={() => setSelectedConnection(null)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-lg md:text-2xl text-center font-semibold text-gray-700">
              Select a conversation to start chatting
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
