import Progressbar from "../../../../components/Progressbar";

function WishlistCard() {
  const dummy = {
    Boot: 5,
    Urlaub: 10,
    Fahrradpumpe: 85,
    Grafikkarte: 20,
    Hochbeet: 70,
  };

  const progressBars = Object.entries(dummy).map(([key, value]) => (
    <div key={key} className="m-2 flex items-center justify-between">
      <div className="w-1/2 text-mm-text-white">{key}</div>

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
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Wunschliste
      </h2>
      <div className="p-1">{progressBars}</div>
    </div>
  );
}

export default WishlistCard;
