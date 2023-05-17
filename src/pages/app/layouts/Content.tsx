import { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import contentRoutes from "../../../routes/contentRoutes";
import Header from "./Header";

function LayoutContent(): ReactElement {
  const element = useRoutes(contentRoutes);

  return (
    <div className="min-h-full w-full flex-col bg-mm-background">
      <Header />
      {element}
    </div>
  );
}

export default LayoutContent;
