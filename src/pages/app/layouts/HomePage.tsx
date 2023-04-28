import LayoutContent from "./Content";
import Nav from "./Nav";

function LayoutPage() {
  return (
    <div className="grid h-full grid-cols-12">
      <div className="col-span-2 h-full">
        <Nav />
      </div>
      <div className="col-span-10 h-full">
        <LayoutContent />
      </div>
    </div>
  );
}

export default LayoutPage;
