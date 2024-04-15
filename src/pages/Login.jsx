import axios from "axios";
import React, { useState } from "react";
import { BsChatText } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useGetUser from "../hook/useGetUser";
import { setUser } from "../redux/features/userSlice";
import { toastError, toastSuccess } from "../utilities/toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const { user, loading } = useGetUser();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setRedirect(true);
    setLoginLoading(true);

    try {
      const result = await axios.post(
        "https://chat-app-sam.vercel.app/user/login",
        {
          email,
          password,
        }
      );

      if (result.status === 200) {
        toastSuccess("Login successful!");
        const token = result.data.token;
        const user = result.data.user;
        dispatch(setUser({ token, user }));
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      toastError(error.response.data.error);
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (loginLoading) return <Spinner />;
  if (user) {
    if (!redirect) toastError("You are already logged in");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="p-4 sm:p-12 min-h-[calc(100vh-30px)] sm:min-h-screen flex flex-col">
      <div className="sm:border-2 border-neutral max-w-lg w-full rounded-3xl p-6 sm:p-14 m-auto">
        <h1 className="w-fit mx-auto text-4xl text-white flex items-center gap-x-6 font-bold mb-8">
          <span className="flex justify-center items-center w-12 h-12 bg-accent p-3 rounded-xl">
            <BsChatText className="text-white" />
          </span>
          Chat App
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-y-6"
        >
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent border-primary outline-none focus:border-secondary border-[1.5px] rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-primary outline-none focus:border-secondary border-[1.5px] rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 uppercase bg-secondary text-white active:bg-accent rounded-lg"
          >
            Login
          </button>
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
