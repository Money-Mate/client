import axios from "axios";
import React, { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState("");

  const BE_URL = import.meta.env.VITE_BE_PORT;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BE_URL}/user/getUserData`, {withCredentials: true});
        setUsername(res.data.username);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();

  }, []);
        

  return (
    <>
      <header className="col-span-12 h-30 bg-indigo-200 m-5 rounded-lg">
        {" "}
        <div className="m-5 relative">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
            {username && `Willkommen zurück ${username}! 👋`}
          </h1>
          <p>Willkommen auf deinem Dashboard, Money Mate!</p>
        </div>
      </header>
    </>
  );
}

export default Header;