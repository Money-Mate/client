import React, { useState } from "react";
import "../index.css"; // import the Tailwind CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  // const { setUser, setIsLoggedIn } = useStore();

  const handleSubmit = async (e:any) => {
    const BE_URL = import.meta.env.VITE_BE_PORT;
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BE_URL}/user/login`,
        userLogin,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    //   localStorage.setItem("user", JSON.stringify(res.data.user));
    //   // setIsLoggedIn(true)
    //   // setUser(res.data.user);
    //   console.log(res.data)
    //   if (localStorage.getItem('user')) {
    //     console.log("user in localstorage")
    //     // navigate("/");
    //   }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Side - Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/id/237/1000/1000')",
        }}
      ></div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border rounded-md py-2 px-3 text-gray-700 w-full"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded-md py-2 px-3 text-gray-700 w-full"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
            />
          </div>

          {/* Login Button */}
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
