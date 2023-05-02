import React, { ReactElement } from "react";
import Header from "./Header";
import { useRoutes } from "react-router-dom";
import contentRoutes from "../../../routes/contentRoutes";

function LayoutContent(): ReactElement {
  const element = useRoutes(contentRoutes);

  return (
    <div className="min-h-full w-full flex-col bg-slate-700">
      <Header />
      {element}
    </div>
  );
}

export default LayoutContent;
