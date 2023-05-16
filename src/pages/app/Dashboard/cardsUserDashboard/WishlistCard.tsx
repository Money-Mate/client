import LoadingSymbol from "../../../../components/LoadingSymbol";
import Progressbar from "../../../../components/Progressbar";
import useDashboardStore from "../../../../context/DashboardStore";

function WishlistCard() {
  const wishes = useDashboardStore((state) => state.dashboardData?.wishlist);

  if (wishes === undefined) return <LoadingSymbol />;

  const sorted = Object.entries(wishes).sort(
    (a, b) => b[1].percent - a[1].percent
  );

  const progressBars = sorted.map(([key, value]) => (
    <div key={key} className="m-2 flex items-center justify-between">
      <div className="w-1/2 text-mm-text-white">{key}</div>

      <div className="group relative flex w-1/2">
        <Progressbar
          percentage={value.percent}
          color={"bg-teal-600"}
          isLimited={false}
        />
        <span
          className="absolute left-1/2 m-4 mx-auto -translate-x-1/2 translate-y-full rounded-md bg-mm-foreground px-1 
    text-sm text-gray-100 opacity-0 transition-opacity group-hover:z-10 group-hover:opacity-100"
        >
          {value.percent}% gespart
        </span>
      </div>
    </div>
  ));

  return (
    <div className=" h-full rounded-md  bg-mm-foreground">
      <h2 className="text-gradient m-2 bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text pt-3 text-center text-xl font-bold leading-tight text-transparent">
        Wunschliste
      </h2>
      <div className="p-1">{progressBars}</div>
    </div>
  );
}

export default WishlistCard;
