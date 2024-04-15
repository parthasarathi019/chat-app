import React, { useState } from "react";

import { BsPower } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Spinner from "../components/Spinner";
import useGetUser from "../hook/useGetUser";
import { logoutUser } from "../redux/features/userSlice";
import { toastError, toastSuccess } from "../utilities/toastify";

const Home = () => {
  const { user, loading } = useGetUser();
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  // logout user
  const logoutHandler = () => {
    dispatch(logoutUser());
    setRedirect(true);
  };

  // loading and redirect
  if (loading) return <Spinner />;
  if (!user) {
    if (redirect) toastSuccess("Logout successful!");
    else toastError("Please login first");
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="bg-base-100">
      <div className="flex gap-x-6 max-w-screen-2xl mx-auto relative">
        <SideBar user={user} />
        <div className="flex-1 min-h-[calc(100vh-30px)] sm:min-h-screen relative">
          {/* dropdown menu for logout and profile info */}
          <div className="dropdown dropdown-bottom dropdown-end absolute top-4 right-20 md:right-4 z-50">
            <label tabIndex={0} className="btn m-1 btn-accent btn-square">
              <BsPower className="text-white" />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content bg-neutral menu p-2 shadow rounded-box w-52"
            >
              <li>
                <a>{user.fullname}</a>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>

          {/* for home and chat route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
