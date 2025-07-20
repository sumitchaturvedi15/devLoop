import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const TargetChat = () => {
  const { targetUser } = useParams();
  const [targetUserInfo, setTargetUserInfo] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const messageBox = useRef(null);

  const fetchChat = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUser, {
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
      // console.error("Error fetching chat:", err);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/${targetUser}`, {
          withCredentials: true,
        });
        setTargetUserInfo({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          photoUrl: res.data.photoUrl,
        });
      } catch (err) {
        console.error("Error fetching target user", err);
      }
    };

    fetchTargetUser();
  }, [targetUser]);

  useEffect(() => {
    messageBox.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUser) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinChat", { userId, targetUser });
    });

    socket.on("receivedMessage", ({ newMessage }) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUser]);

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
      targetUser,
      newMessage: messageData,
    });

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const groupMessagesBySender = (messages) => {
    const grouped = [];
    let currentGroup = [];

    messages.forEach((msg, i) => {
      const prev = messages[i - 1];
      if (
        !prev ||
        prev.senderId !== msg.senderId ||
        dayjs(prev.timestamp).format("YYYY-MM-DD") !== dayjs(msg.timestamp).format("YYYY-MM-DD")
      ) {
        if (currentGroup.length) grouped.push(currentGroup);
        currentGroup = [msg];
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length) grouped.push(currentGroup);
    return grouped;
  };

  const groupedMessages = groupMessagesBySender(messages);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 to-blue-200 text-black flex flex-col items-center py-6 px-2 md:px-6">
      
      <div className="w-full max-w-3xl flex items-center gap-4 px-4 py-4 mb-6 bg-white/50 backdrop-blur rounded-xl border border-white/30 shadow-lg text-black">
        <Link
          to="/connections"
          className="group inline-flex items-center gap-1 text-sm font-medium text-black hover:text-blue-700 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </Link>

        {targetUserInfo.photoUrl && (
          <img src={targetUserInfo.photoUrl} alt="Target" className="h-10 w-10 rounded-full object-cover border border-pink-400 shadow" />
        )}

        <span className="text-lg md:text-2xl font-semibold truncate">
          {targetUserInfo.firstName} {targetUserInfo.lastName}
        </span>
      </div>

      {/* Chat Messages */}
      <div className="w-full max-w-3xl h-[60vh] md:h-[70vh] flex flex-col bg-white/50 rounded-xl p-4 border border-white/30 backdrop-blur shadow-inner overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          {groupedMessages.map((group, idx) => {
            const isSender = group[0].senderId === userId;
            const showName = group[0].firstName && group[0].lastName;
            return (
              <div key={idx} className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                {showName && (
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    {isSender ? "You" : `${group[0].firstName} ${group[0].lastName}`}
                  </div>
                )}
                {group.map((msg, i) => (
                  <div
                    key={i}
                    className={`relative group max-w-xs md:max-w-sm px-4 py-2 my-1 rounded-2xl text-sm shadow transition-all duration-300 ${
                      isSender ? "bg-pink-500 text-white" : "bg-blue-200 text-black border border-white/20"
                    }`}
                  >
                    <span>{msg.text}</span>
                    <div className="text-[10px] text-gray-700 mt-1 text-right">
                      {dayjs(msg.timestamp).format("hh:mm A")}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          <div ref={messageBox} />
        </div>
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl mt-4 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-black placeholder-gray-700 px-4 py-2 text-sm outline-none"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 transition px-5 py-2 rounded-lg text-white font-medium text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TargetChat;

