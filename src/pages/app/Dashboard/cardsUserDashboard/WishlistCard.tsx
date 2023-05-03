import Progressbar from "../../../../components/Progressbar";

function WishlistCard() {
  const dummy = { Schwimmbad: 90, Urlaub: 10, Hundekostüm: 5, Entenfutter: 20, Boot: 20, Krokodil: 70 };

  const progressBars = Object.entries(dummy).map(([key, value]) => (
    <div key={key} className="flex items-center justify-between m-2">
      <div className="w-1/2 text-mm-text-dark" >{key}</div>
      <div className="w-1/2" >
        <Progressbar percentage={value} />
      </div>
    </div>
  ));

  return (
    <div className=" h-full rounded-md  bg-mm-foreground">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Wunschliste
      </h2>
      <div className="p-1">{progressBars}</div>


      <button data-tooltip-target="tooltip-light" data-tooltip-style="light" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Light tooltip</button>
<div id="tooltip-light" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
    Tooltip content
    <div className="tooltip-arrow" data-popper-arrow></div>
</div>
    </div>
  );
}

export default WishlistCard;