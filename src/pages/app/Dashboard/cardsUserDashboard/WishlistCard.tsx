import Progressbar from "../../../../components/Progressbar";

function WishlistCard() {
  const dummy = {
    Schwimmbad: 90,
    Urlaub: 10,
    Hundekostüm: 5,
    Entenfutter: 20,
    Boot: 20,
    Krokodil: 70,
  };

  const progressBars = Object.entries(dummy).map(([key, value]) => (
    <div key={key} className="m-2 flex items-center justify-between">
      <div className="w-1/2 text-mm-text-dark">{key}</div>
      <div className="group relative flex w-1/2">
        <Progressbar percentage={value} color={"bg-teal-600"} isLimited={false}/>
        <span
          className="absolute left-1/2 m-4 mx-auto -translate-x-1/2 translate-y-full rounded-md bg-mm-foreground px-1 
    text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100 group-hover:z-10"
        >
          {value}% gespart
        </span>
      </div>
    </div>
  ));

  return (
    <div className=" h-full rounded-md  bg-mm-foreground">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Wunschliste
      </h2>
      <div className="p-1">{progressBars}</div>
    </div>
  );
}

export default WishlistCard;
