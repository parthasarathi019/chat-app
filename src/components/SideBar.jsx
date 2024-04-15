import axios from "axios";
import React, { useState } from "react";
import { BsChatText } from "react-icons/bs";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useChat from "../hook/useChat";
import { addChatList } from "../redux/features/chatSlice";
import { toastError } from "../utilities/toastify";
import Conversation from "./Conversation";
import Spinner from "./Spinner";

const SideBar = ({ user }) => {
  const [searchParam, setSearchParam] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { chatList, chatlistLoading } = useChat();
  const dispatch = useDispatch();

  // add new connection by email
  const handleAddUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.post(
        `https://chat-app-sam.vercel.app/chat/${searchParam}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (result.status === 201) {
        dispatch(addChatList(result.data));
      }
    } catch (error) {
      toastError(error.response.data.error);
    }
  };

  return (
    <>
      {/* hamberger menu */}
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="btn btn-square btn-accent text-xl absolute flex md:hidden right-5 top-5 z-[999]"
      >
        {openMenu ? (
          <RiMenuFoldLine className="text-2xl" />
        ) : (
          <RiMenuUnfoldLine className="text-2xl" />
        )}
      </div>

      <div
        className={`p-4 bg-base-100 w-screen left-0 absolute md:translate-x-0 md:max-w-sm md:w-auto md:static lg:flex-1 z-40 duration-300 h-full ${
          openMenu ? "translate-x-0" : "-translate-x-[650px]"
        }`}
      >
        {/* logo */}
        <h1
          onClick={() => setOpenMenu(false)}
          className="w-fit text-3xl text-white flex items-center gap-x-4 font-bold mb-5"
        >
          <span className="flex justify-center items-center w-10 h-10 bg-accent p-3 rounded-xl">
            <BsChatText className="text-white" />
          </span>
          <Link to="/">Chat App</Link>
        </h1>

        {/* add user input box */}
        <div className="form-control mb-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Add connection by email"
              className="input input-bordered border-neutral border-2 w-full !outline-none"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <button
              onClick={handleAddUser}
              className="absolute right-0 btn border-2 border-neutral btn-outline btn-square !rounded-lg hover:bg-accent hover:border-neutral hover:text-white text-3xl"
            >
              +
            </button>
          </div>
        </div>

        {/* chat list */}
        <div>
          {chatlistLoading && <Spinner />}
          <ul className="space-y-4 h-[calc(100vh-180px)] md:pr-3 md:border-r-4 border-neutral overflow-y-scroll">
            {chatList.map((chat) => (
              <Conversation
                key={chat._id}
                chat={chat}
                setOpenMenu={setOpenMenu}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
