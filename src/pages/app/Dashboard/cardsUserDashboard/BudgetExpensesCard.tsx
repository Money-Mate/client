import Progressbar from "../../../../components/Progressbar";


function BudgetExpenses() {
  const dummy = {
    FastFood: 50,
    Freizeit: 90,
    Pflanzen: 85,
    Restaurant: 10,
    Süßigkeiten: 5,
  };

  const progressBars = Object.entries(dummy).map(([key, value]) => (
    <div key={key} className="m-2 flex items-center justify-between">
      <div className="w-1/2 text-mm-text-dark">{key}</div>
      <div className="group relative flex w-1/2">
        <Progressbar percentage={value} color={"bg-sky-600"} isLimited={true}/>
        <span
          className="absolute left-1/2 m-4 mx-auto -translate-x-1/2 translate-y-full rounded-md bg-mm-foreground px-1 
    text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100 group-hover:z-10"
        >
          {value}% ausgeschöpft
        </span>
      </div>
    </div>
  ));

  return (
    <div className=" h-full rounded-md  bg-mm-foreground">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Budgets
      </h2>
      <div className="p-1">{progressBars}</div>
    </div>
  );
}

export default BudgetExpenses;
