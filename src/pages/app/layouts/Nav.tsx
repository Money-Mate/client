import { NavLink } from "react-router-dom";
import LogoutButton from "../../app/userProfile/LogoutButton";

function Nav() {
  const items = [
    {
      name: "UserDashboard",
      to: "/app/userdashboard",
      id: 1,
    },
    {
      name: "Girokonten",
      to: "/app/userdashboard",
      sublinks: [{ name: "Transaktionen", to: "/app/transactionsgiro", id: 1 }],
      id: 2,
    },
    {
      name: "Investments",
      to: "/app/userdashboard",
      id: 3,
    },
    {
      name: "Finanzgesundheit",
      to: "/app/",
      id: 4,
    },
    {
      name: "Userprofil",
      to: "/app/userprofil",
      id: 5,
    },
  ];

  return (
    
    <div className="h-full w-full bg-mm-foreground p-5">
     <h1 className="text-white mb-5 text-3xl font-bold">MoneyMate</h1>
     <ul className="text-white p-3 tracking-wide leading-loose">
                {" "}
                {items.map((item) => {
                  return (
                    <li className="text-blue" key={item.id}>
                      <NavLink to={item.to}>{item.name}</NavLink>
                    </li>
                  );
                })}
              </ul>
 
    </div>
  );
}

export default Nav;
