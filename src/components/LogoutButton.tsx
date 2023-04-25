import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
  const BE_URL = import.meta.env.VITE_BE_PORT;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${BE_URL}/user/logout`, {
        withCredentials: true,
      });
      console.log("user removed from localstorage")
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;