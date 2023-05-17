import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

interface UserRegister {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

const signUpSchema = z.object({
  username: z.string().min(3, "Der Username muss mindestens 3 Zeichen haben"),
  email: z.string().email("Bitte gibt eine gültige Emailadresse an"),
  password: z.string().min(3, "Das Passwort muss mindestens 3 Zeichen haben"),
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const BE_URL = import.meta.env.VITE_BE_PORT;
    try {
      const validatedUserData = signUpSchema.parse(formData);
      const res = await axios.post(
        `${BE_URL}/user/register`,
        validatedUserData
      );
      console.log(res);
      navigate("/login");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">Register</h2>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {formErrors.username && (
            <span className="text-sm text-red-500">{formErrors.username}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <span className="text-sm text-red-500">{formErrors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <span className="text-sm text-red-500">{formErrors.password}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
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
