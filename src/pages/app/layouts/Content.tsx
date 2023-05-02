import React, { ReactElement } from "react";
import Header from "./Header";
import { useRoutes } from "react-router-dom";
import contentRoutes from "../../../routes/contentRoutes";

function LayoutContent(): ReactElement {
  const element = useRoutes(contentRoutes);

  return (
    <div className="h-full w-full flex-col bg-mm-background">
      <Header />
      {element}
    </div>
  );
}

export default LayoutContent;
