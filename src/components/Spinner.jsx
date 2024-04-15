import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-30px)] sm:h-screen">
      <div className="center">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default Spinner;
