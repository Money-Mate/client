import LayoutContent from "./LayoutContent";
import Nav from "./Nav";

function LayoutPage() {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 bg-indigo-800 h-full">
        <Nav />
      </div>
      <div className="col-span-10 h-full">
        <LayoutContent/>
      </div>
    </div>
  );
}

export default LayoutPage;
