import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from 'zod';

interface UserRegister {
  username: string,
  email: string;
  password: string;
}

interface FormErrors {
  username?: string,
  email?: string;
  password?: string;
}

const signUpSchema = z.object({
  username: z.string().min(3, 'Der Username muss mindestens 3 Zeichen haben'),
  email: z.string().email('Bitte gibt eine gültige Emailadresse an'),
  password: z.string().min(3, 'Das Passwort muss mindestens 3 Zeichen haben'),
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate= useNavigate();

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const BE_URL = import.meta.env.VITE_BE_PORT;
    try {
      const validatedUserData = signUpSchema.parse(formData);
      const res = await axios.post(`${BE_URL}/user/register`, validatedUserData);
      console.log(res);
      navigate("/login")
    } catch (error:any) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
           {formErrors.username && (
                  <span className="text-sm text-red-500">
                    {formErrors.username}
                  </span>
                )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           {formErrors.email && (
                  <span className="text-sm text-red-500">
                    {formErrors.email}
                  </span>
                )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
           {formErrors.password&& (
                  <span className="text-sm text-red-500">
                    {formErrors.password}
                  </span>
                )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
);
};

export default SignUp;    
