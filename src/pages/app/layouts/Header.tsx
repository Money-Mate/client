import axios from "axios";
import React, { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState("");

  const BE_URL = import.meta.env.VITE_BE_PORT;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BE_URL}/user/getUserData`, {
          withCredentials: true,
        });
        setUsername(res.data.username);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <header>
        {" "}
        <div className="relative mx-5 rounded bg-mm-foreground p-4 text-gray-50">
          <h1 className="mb-1 text-2xl font-bold md:text-3xl ">
            {username && `Willkommen zurück ${username}! 👋`}
          </h1>
          <p>Willkommen auf deinem Dashboard, Money Mate!</p>
        </div>
      </header>
    </>
  );
}

export default Header;
