import axios from "axios";
import React, { useState } from "react";
import { BsPlus, BsSendFill } from "react-icons/bs";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/features/messageSlice";

const ChatInputBox = ({ chat, socket, smoothScroll }) => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();

  // send message handler
  const sendMessage = async () => {
    // prevent to send empty message
    if (newMessage.trim() === "") return;

    // save message to db
    const token = localStorage.getItem("token");
    try {
      const result = await axios.post(
        "https://chat-app-sam.vercel.app/message",
        { chatId: chat._id, text: newMessage },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // to see sent message in real time
      if (!smoothScroll.current) smoothScroll.current = true;
      dispatch(addMessage(result.data));

      // send message to socket server
      socket.current.emit("message", result.data);

      // clear input field
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="absolute bottom-4 bg-base-100 left-0 right-0 p-4 md:px-8 form-control flex flex-row gap-x-2 md:gap-x-3 items-center">
        <button>
          <BsPlus className="text-4xl text-accent" />
        </button>
        <InputEmoji
          value={newMessage}
          theme="dark"
          cleanOnEnter
          onEnter={sendMessage}
          onChange={(e) => setNewMessage(e)}
        />

        <button
          onClick={sendMessage}
          className="btn w-16 btn-accent !rounded-full"
        >
          <BsSendFill className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default ChatInputBox;
