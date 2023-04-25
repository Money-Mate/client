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
    <div className="h-full w-full bg-gray-900">
      <span className=" left-4 top-5 cursor-pointer text-4xl text-white"></span>
      <nav className="sidebar bottom-0 top-0 h-screen sticky bg-gray-900 text-center">
        <div className="text-xl text-gray-100">
          <div className="flex items-center p-2.5">
            <h1 className="ml-3 text-[15px] font-bold text-gray-200">
              MoneyMate
            </h1>
          </div>
          <div className="my-2 h-[1px] bg-gray-600"></div>
        </div>
        <div className="flex cursor-pointer items-center rounded-md bg-gray-700 p-2.5 px-4 text-white duration-300">
          <input
            type="text"
            placeholder="Search"
            className="ml-4 w-full bg-transparent text-[15px] focus:outline-none"
          />
        </div>

        <div className="my-4 h-[1px] bg-gray-600"></div>
        <div className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-blue-600">
          <div className="flex w-full items-center justify-between">
            <span className="ml-4 text-[15px] font-bold text-gray-200">
              Konten
            </span>
            <span className="rotate-180 text-sm" id="arrow">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
        <div
          className="mx-auto mt-2 w-4/5 text-left text-sm font-bold text-gray-200"
          id="submenu"
        >
          <h1 className="mt-1 cursor-pointer rounded-md p-2 hover:bg-blue-600">
            commerzbank
          </h1>
          <h1 className="mt-1 cursor-pointer rounded-md p-2 hover:bg-blue-600">
            Sparkasse
          </h1>
          <h1 className="mt-1 cursor-pointer rounded-md p-2 hover:bg-blue-600">
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
      </nav>
    </div>
  );
}

export default Nav;
