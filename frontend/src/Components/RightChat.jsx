import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const RightChat = ({
  connection,
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  messageBox,
  onBack,
}) => {
  useEffect(() => {
    if (messageBox?.current) {
      messageBox.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!connection) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-600 bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center px-6">
          Select a connection to start chatting
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 rounded-xl shadow-lg flex flex-col">
      
      <div className="flex items-center justify-between border-b px-6 py-4 bg-purple-100 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 block md:hidden text-purple-600 hover:text-purple-800 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <img
            src={connection.photoUrl || "/default-avatar.png"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover mr-3 border border-purple-200"
          />
          <div>
            <div className="text-base md:text-lg font-semibold text-gray-800">
              {connection.firstName} {connection.lastName}
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">
            No messages yet
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.senderId === connection._id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-sm md:max-w-md break-words text-sm shadow ${
                  msg.senderId === connection._id
                    ? "bg-white text-gray-800"
                    : "bg-purple-500 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messageBox}></div>
      </div>

      {/* Input */}
      <div className="flex items-center p-4 border-t bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 shadow-inner">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-purple-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RightChat;
