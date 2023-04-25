import LayoutContent from "./LayoutContent";
import Nav from "./Nav";

function LayoutPage() {
  return (
    <div className="grid grid-cols-12 h-full bg-neutral-200">
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
