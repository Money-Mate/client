import axios from "axios";
import React, { useEffect, useState } from "react";
import piggyBank from "../../../assets/piggy-bank.svg";

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
    <div className="relative mb-5 mx-1 rounded bg-mm-foreground p-4 text-gray-50 flex justify-between items-center">
      <div className="mr-4">
        <h1 className="mb-2 mt-2 text-2xl font-bold md:text-3xl ">
          {username && `Hallo ${username}! 👋`}
        </h1>
        <p className="ml-1 text-mm-text-dark">
          Willkommen auf deinem Dashboard, Money Mate!
        </p>
      </div>
      <div className="w-16">
        <img src={piggyBank} alt="Logo" style={{ transform: 'scaleX(-1)' }} />
      </div>
    </div>
  </header>
</>


  
  );
}

export default Header;
