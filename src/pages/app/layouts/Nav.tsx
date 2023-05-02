import { NavLink } from "react-router-dom";

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
      sublinks: [
        { name: "Transaktionen", to: "/app/transactionsinvest", id: 1 },
        { name: "Analyse", to: "/app/analyseinvest", id: 2 },
      ],
      id: 3,
    },
    {
      name: "Finanzgesundheit",
      to: "/app/",
      id: 4,
    },
  ];

  const renderSublinks = (sublinks: Sublink[]) => {
    return (
      <ul>
        {sublinks.map((sublink) => (
          <li
            key={sublink.id}
            className="ml-5 font-semibold text-mm-text-dark "
          >
            <NavLink to={sublink.to}>{sublink.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="relative h-full w-full bg-mm-foreground p-5">
      <h1 className="mb-5 text-3xl font-bold text-white">MoneyMate</h1>
      <ul className="p-3 leading-loose tracking-wide text-white">
        {items.map((item) => (
          <li className="text-blue font-semibold" key={item.id}>
            {item.sublinks ? (
              <div>
                <NavLink to={item.to}>{item.name}</NavLink>
                {renderSublinks(item.sublinks)}
              </div>
            ) : (
              <NavLink to={item.to}>{item.name}</NavLink>
            )}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-20 left-16 h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <NavLink to="/app/userprofile">
          <img
            src="https://picsum.photos/200"
            alt="User Profile Picture"
            className="h-full w-full rounded-full"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
