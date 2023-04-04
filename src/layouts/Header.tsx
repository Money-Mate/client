import React from "react";

function Header() {
  return (
    <>
      <header className="col-span-12 h-30 bg-indigo-200 m-5 rounded-lg">
        {" "}
        <div className="m-5 relative">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
            Willkommen zurück Florian-Leonie-Sebastian Mate. 👋
          </h1>
          <p>Willkommen auf deinem Dashboard, Money Mate!</p>
        </div>
      </header>
    </>
  );
}

export default Header;
