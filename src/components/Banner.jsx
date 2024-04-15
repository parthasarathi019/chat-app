import Lottie from "lottie-react";
import React from "react";
import { useSelector } from "react-redux";
import hello from "../assets/hello.json";

const Banner = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="h-full flex flex-col justify-center items-center text-white">
      <Lottie animationData={hello} className="w-96" />
      <h1 className="text-4xl font-bold mb-2 text-center">
        Welcome, <span className="text-accent">{user?.fullname}</span>
      </h1>
      <h3>Please select a chat to start messaging..</h3>
    </div>
  );
};

export default Banner;
