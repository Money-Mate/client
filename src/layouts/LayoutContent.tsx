import React, { ReactElement } from "react";
import Header from "./Header";
import Main from "./Main";
import { useRoutes } from "react-router-dom";
import routes from "../routes/routes";

function LayoutContent(): ReactElement {
  const element = useRoutes(routes);

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-200">
      <Header />
      <Main>{element}</Main>
    </div>
  );
}

export default LayoutContent;