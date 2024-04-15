import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { addMessage, fetchMessages } from "../redux/features/messageSlice";
import ChatHeader from "./ChatHeader";
import ChatInputBox from "./ChatInputBox";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import Spinner from "./Spinner";

const ENDPOINT = "https://chat-app-socket-224c.onrender.com";

const Chat = () => {
  const messages = useSelector((state) => state.messageReducer.messages);
  const messageLoading = useSelector((state) => state.messageReducer.loading);
  const [newMessage, setNewMessage] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const { fullname, chat, userId, avatar, selectedUserId } = location.state;
  const socket = useRef();
  const chatContainerRef = useRef(null);
  const smoothScroll = useRef();

  const chatId = chat._id;

  useEffect(() => {
    smoothScroll.current = false;
    dispatch(fetchMessages(chatId));
  }, [chatId]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // receive msg from socket server
  useEffect(() => {
    socket.current = io(ENDPOINT);

    socket.current.on("message", (msg) => {
      if (msg) setNewMessage(msg);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      newMessage &&
      newMessage.chatId === chatId &&
      newMessage.senderId === selectedUserId
    ) {
      if (!smoothScroll.current) smoothScroll.current = true;
      dispatch(addMessage(newMessage));
    }
  }, [newMessage]);

  if (!location.state) return <Navigate to="/" replace={true} />;

  return (
    <div className="h-full p-4 relative">
      <ChatHeader fullname={fullname} avatar={avatar} />
      <div
        className={`py-6 pb-16 h-[calc(100vh-150px)] overflow-y-auto ${
          smoothScroll.current ? "scroll-smooth" : "scroll-auto"
        }`}
        ref={chatContainerRef}
      >
        {messageLoading && <Spinner />}
        {messages.map((message) => {
          if (message.chatId === chatId)
            return message.senderId === userId ? (
              <SentMessage key={message._id} msg={message} />
            ) : (
              <ReceivedMessage
                key={message._id}
                msg={message}
                fullname={fullname}
                avatar={avatar}
              />
            );
        })}
      </div>

      <ChatInputBox chat={chat} socket={socket} smoothScroll={smoothScroll} />
    </div>
  );
};

export default Chat;
