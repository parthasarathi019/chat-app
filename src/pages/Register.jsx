import axios from "axios";
import React, { useState } from "react";
import { BsChatText } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useGetUser from "../hook/useGetUser";
import { toastError, toastSuccess } from "../utilities/toastify";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  const { user, loading } = useGetUser();

  const navigate = useNavigate();

  const handleImageDrop = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);

    try {
      // name validation
      if (fullname.length < 3)
        throw new Error("Name should be minimum three characters");

      //  email validation
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false)
        throw new Error("Please input valid email address");

      // password validation
      if (password !== confirmPassword)
        throw new Error("Password did not match!");
   
      // image validation
      if (!image) throw new Error("Please select avatar");
      const imageExtension = image.name.split(".").pop().toLowerCase();
      const acceptedExtension = ["jpg", "png", "jpeg"];
      if (acceptedExtension.includes(imageExtension) === false)
        throw new Error("Please select jpg, jpeg or png file");
      if (image.size > 1024 * 1024)
        throw new Error("Image should be less than 1MB");

      // create form data
      const formData = new FormData();
      formData.set("avatar", image);
      formData.set("fullname", fullname);
      formData.set("email", email);
      formData.set("password", password);

      const result = await axios.post(
        "https://chat-app-sam.vercel.app/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.status === 201) {
        toastSuccess(result.data.message + ". Please login now");
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setImage(null);
        console.log(result.data);
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      if (error.response) return toastError(error.response.data.error);
      else return toastError(error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (registerLoading) return <Spinner />;
  if (user) {
    toastError("Please logout first to register new account");
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
          onSubmit={handleRegister}
          className="flex flex-col justify-center gap-y-6"
        >
          <label
            htmlFor="imgInput"
            className="w-20 h-20 p-1 rounded-full mx-auto relative bg-primary"
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                imgUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              alt="avatar"
            />
            <span className="absolute bottom-0 right-0 bg-white w-6 h-6 rounded-full flex justify-center items-center text-3xl">
              +
            </span>
          </label>
          <input
            hidden
            type="file"
            id="imgInput"
            accept="image/jpeg,image/png"
            onChange={handleImageDrop}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent border-primary outline-none focus:border-secondary border-[1.5px] rounded-lg p-3"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-transparent border-primary outline-none focus:border-secondary border-[1.5px] rounded-lg p-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 uppercase bg-secondary text-white active:bg-accent rounded-lg"
          >
            Register
          </button>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-accent">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
