import { NavLink } from "react-router-dom";
import piggyBank from "../../../assets/piggy-bank-green.svg";

interface Sublink {
  name: string;
  to: string;
  id: number;
}

interface Item {
  name: string;
  to: string;
  sublinks?: Sublink[];
  id: number;
}

function Nav() {
  const items: Item[] = [
    {
      name: "Girokonten",
      to: "/app/userdashboard",
      sublinks: [{ name: "Transaktionen", to: "/app/transactionsgiro", id: 1 }],
      id: 1,
    },
    {
      name: "Investitionen",
      to: "/app/investmentdashboard",
      sublinks: [
        { name: "Transaktionen", to: "/app/transactionsinvest", id: 1 },
      ],
      id: 2,
    },
    {
      name: "Statistik",
      to: "/app/statistics",
      id: 3,
    },{
      name: "Wünsche",
      to: "/app/wishes",
      id: 5,
    }
  ];

  const renderSublinks = (sublinks: Sublink[]) => {
    return (
      <ul>
        {sublinks.map((sublink) => (
          <li
            key={sublink.id}
            className="m-4 my-5 font-semibold text-mm-text-dark "
          >
            <NavLink to={sublink.to}>{sublink.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="relative h-full w-full bg-mm-foreground p-5">
   

        <img src={piggyBank} alt="Logo" className="w-20"/>
      <h1 className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-3xl font-bold leading-tight text-transparent">
        MoneyMate
      </h1>
      <ul className="p-3 mt-2 leading-loose tracking-wide text-white">
        {items.map((item) => (
          <li
            className=" text-blue m-4 p-2 text-xl/4 font-semibold"
            key={item.id}
          >
            {item.sublinks ? (
              <div>
                <NavLink to={item.to} className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent">{item.name}</NavLink>
                {renderSublinks(item.sublinks)}
              </div>
            ) : (
              <NavLink to={item.to} className="text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent">{item.name}</NavLink>
            )}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-20 left-16 h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <NavLink to="/app/userprofile">
          <img
            src="https://picsum.photos/200"
            alt="User Profile Picture"
            className="h-full w-full rounded-full border-2 border-mm-primary"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
