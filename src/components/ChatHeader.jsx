import React from "react";

const ChatHeader = ({ fullname, avatar }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="flex cursor-pointer items-center gap-x-4 font-semibold text-xl text-white rounded-md">
        <img
          src={
            avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <span>{fullname}</span>
      </h1>
    </div>
  );
};

export default ChatHeader;
