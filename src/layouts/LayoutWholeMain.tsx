import React from "react";
import Header from "./Header";
import Main from "./Main";

function LayoutMain() {
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-200">
      <Header />
      <Main />
    </div>
  );
}

export default LayoutMain;
