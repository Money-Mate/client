import React, { ReactElement } from "react";
import Header from "./Header";
import Main from "../layouts/Main";
import { useRoutes } from "react-router-dom";
import contentRoutes from "../../../routes/contentRoutes";

function LayoutContent(): ReactElement {
  const element = useRoutes(contentRoutes);

  return (
    <div className="min-h-full w-full flex-col bg-neutral-200">
      <Header />
      <Main>{element}</Main>
    </div>
  );
}

export default LayoutContent;
