import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import PiggyBank from "../../assets/piggy-bank-green.svg";
import DangerAlert from "../../components/dangerAlert";
import SuccessAlert from "../../components/successAlert";

interface UserLogin {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const signInSchema = z.object({
  email: z.string().email("Bitte gib eine gültige Emailadrese an"),
  password: z.string().min(3, "Das Passwort muss mindestens 3 Zeichen haben"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const BE_URL = import.meta.env.VITE_BE_PORT;
    e.preventDefault();
    try {
      const validatedUserData = signInSchema.parse(userLogin);
      const res = await axios.post(`${BE_URL}/user/login`, validatedUserData, {
        withCredentials: true,
      });
      navigate("/app/userdashboard");
      setSuccessMessage("Ok!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
        setErrorMessage("Bitte überprüfe deine Eingaben.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Side - Image */}
      <div className="w-1/2 bg-mm-foreground bg-cover bg-center">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
          <div className="flex-row items-center">
            <img src={PiggyBank} alt="Piggy" className="mt-20" />
            <div className="ml-4">
              <br />
              <h1 className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-5xl font-bold leading-tight text-transparent">
                Money Mate
              </h1>
              <br />
              <p className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-lg font-semibold leading-tight text-transparent">
                Dein All-in-One-Tool für kluge Finanzentscheidungen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-1/2 items-center justify-center bg-mm-background ">
        <div className="w-full max-w-md">
          <h1 className="mb-6 text-3xl font-bold text-mm-foreground ">Login</h1>
          {/* Success Alert */}
          {successMessage && (
            <SuccessAlert
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}
          {/* Error Alert */}
          {errorMessage && (
            <DangerAlert
              message={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-mm-foreground"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full rounded-md border px-3 py-2 text-gray-700"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
              {formErrors.email && (
                <span className="text-sm text-red-500">{formErrors.email}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-mm-foreground"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full rounded-md border px-3 py-2 text-gray-700"
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
                className="m-2 rounded-lg bg-teal-600 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
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
