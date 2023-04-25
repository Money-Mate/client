import React, { useState, FormEvent } from "react";
import "../index.css"; // import the Tailwind CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as z from 'zod';

interface UserLogin {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const BE_URL = import.meta.env.VITE_BE_PORT;
    e.preventDefault();
    try {
      const validatedUserData = signInSchema.parse(userLogin);
      const res = await axios.post(
        `${BE_URL}/user/login`,
        validatedUserData,
        {
          withCredentials: true,
        }
      );
      navigate("/app/userdashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
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
          <form onSubmit={handleSubmit}>

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
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
              {formErrors.email && (
                  <span className="text-sm text-red-500">
                    {formErrors.email}
                  </span>
                )}
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
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
              {formErrors.password && (
                  <span className="text-sm text-red-500">
                    {formErrors.password}
                  </span>
                )}
            </div>

            {/* Login Button */}
            <div className="mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
