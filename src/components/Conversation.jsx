import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Conversation = ({ chat, setOpenMenu }) => {
  const [fullname, setFullname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { _id } = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getConnectionInfo = async () => {
      const id = chat.members.find((id) => id !== _id);
      try {
        const result = await axios.get(
          `https://chat-app-sam.vercel.app/user/connectionInfo/${id}`
        );

        setSelectedUserId(id);
        setFullname(result.data.fullname);
        setAvatar(result.data.avatar);
      } catch (error) {
        console.log(error);
      }
    };

    getConnectionInfo();
  }, []);

  // open inbox on click conversation
  const openConversation = () => {
    setOpenMenu(false);
    navigate(`/chat/${selectedUserId}`, {
      replace: true,
      state: {
        fullname,
        chat,
        userId: _id,
        avatar,
        selectedUserId,
      },
    });
  };

  return (
    <li
      onClick={openConversation}
      className={`flex cursor-pointer items-center gap-x-4 font-semibold text-xl text-white rounded-md p-2 ${
        selectedUserId === params.id ? "bg-neutral" : "bg-neutral/40"
      }`}
    >
      <img
        src={
          avatar ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }
        alt=""
        className="w-12 h-12 border-2 border-accent rounded-full"
      />
      <span>{fullname}</span>
    </li>
  );
};

export default Conversation;
