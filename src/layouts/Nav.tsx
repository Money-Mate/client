import React from "react";
import { useUserStore } from "../context/userContext";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Nav() {
  // const isLoggedIn = useUserStore(
  // (state: { isLoggedIn: boolean }) => state.isLoggedIn
  // );
  const isLoggedIn = false;

  const items = [
    {
      name: "Landing Page",
      to: "/landingpage",
      id: 0,
      isProtected: isLoggedIn,
    },
    {
      name: "SignIn",
      to: "/signin",
      id: 1,
      isProtected: isLoggedIn,
    },
    {
      name: "SignUp",
      to: "/signup",
      id: 2,
      isProtected: isLoggedIn,
    },
    {
      name: "UserDashboard",
      to: "/app/userdashboard",
      id: 3,
      isProtected: isLoggedIn,
    },
    {
      name: "BankAccounts",
      to: "/app/bankaccounts",
      id: 4,
      isProtected: isLoggedIn,
    },
    {
      name: "TransactionsGiro",
      to: "/app/transactionsgiro",
      id: 5,
      isProtected: isLoggedIn,
    },
  ];

  const filteredItems = items.filter((item) => item.isProtected === isLoggedIn);

  return (
    <div className="bg-blue-600 w-full h-full">
      <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer"></span>
      <div className="sidebar h-full top-0 bottom-0  text-center bg-gray-900">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 flex items-center">
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              MoneyMate
            </h1>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>

        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Konten
            </span>
            <span className="text-sm rotate-180" id="arrow">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
        <div
          className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
          id="submenu"
        >
          <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
            commerzbank
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
            Sparkasse
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
            DKB
          </h1>
        </div>
        {items.map((item) => {
          if (item.isProtected === false) {
            return (
              <li key={item.id}>
                {" "}
                <NavLink
                  to={item.to}
                  className="block py-2 pl-3 pr-4 text-green-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {item.name}
                </NavLink>
              </li>
            );
          }
        })}
        <div className="p-10">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Nav;
