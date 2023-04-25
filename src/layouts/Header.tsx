import React from "react";

function Header() {
  return (
    <>
      <header className="pt-5">
        {" "}
        <div className="p-5 h-30 col-span-12 rounded-lg bg-indigo-200 mx-5">
          <h1 className="mb-1 text-2xl font-bold text-slate-800 md:text-3xl">
            Willkommen zurück Quan-Florian-Leonie-Sebastian Mate. 👋
          </h1>
          <p>Willkommen auf deinem Dashboard, Money Mate!</p>
        </div>
      </header>
    </>
  );
}

export default Header;
