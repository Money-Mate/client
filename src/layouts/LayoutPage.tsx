import LayoutContent from "./LayoutContent";
import Nav from "./Nav";

function LayoutPage() {
  return (
    <div className="grid grid-cols-12 h-screen m-0 p-0">
      <div className="col-span-2">
        <Nav />
      </div>
      <div className="col-span-10">
        <LayoutContent />
      </div>
    </div>
  );
}

export default LayoutPage;
