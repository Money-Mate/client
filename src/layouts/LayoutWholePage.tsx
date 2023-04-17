import LayoutWholeMain from "./LayoutWholeMain";
import Nav from "./Nav";


function Layout() {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2 bg-indigo-800 h-full">
        <Nav />{" "}
      </div>
      <div className="col-span-10 h-full">
        <LayoutWholeMain />
      </div>
    </div>
  );
}

export default Layout;
