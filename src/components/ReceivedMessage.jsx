import React, { useState } from "react";
import { format } from "timeago.js";

const ReceivedMessage = ({ msg, fullname, avatar }) => {
  const [seeDetails, setSeeDetails] = useState(false);
  return (
    <div className="chat chat-start">
      {/* <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              avatar ||
              "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
          />
        </div>
      </div> */}
      {seeDetails && (
        <div className="chat-header">{fullname.split(" ")[0]}</div>
      )}
      <div
        tabIndex={1}
        onClick={() => setSeeDetails(!seeDetails)}
        onBlur={() => setSeeDetails(false)}
        className="chat-bubble bg-[#2d2d56]"
      >
        {msg.text}
      </div>
      {seeDetails && (
        <div className="chat-footer opacity-50">{format(msg.createdAt)}</div>
      )}
    </div>
  );
};

export default ReceivedMessage;
