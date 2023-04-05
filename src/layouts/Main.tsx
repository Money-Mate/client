import CardFour from "../components/cards/CardFour";
import CardOne from "../components/cards/CardOne";
import CardEightBudget from "../components/cards/CardEightBudget";
import CardThree from "../components/cards/CardThree";
import CardTwo from "../components/cards/CardTwo";
import CardSixSavingGoals from "../components/cards/CardSixSavingGoals";

function Main() {
  return (
    <>
      <div className="grid lg:grid-cols-12 sm:grid-cols-8 grid-rows-4 gap-4 p-5">
        <div className="col-span-3 bg-neutral-400 rounded-lg">
          <CardOne />
        </div>
        <div className="col-span-3  bg-neutral-400 rounded-lg">
          <CardTwo />
        </div>
        <div className="col-span-3 bg-neutral-400 rounded-lg">
          <CardThree />
        </div>
        <div className="col-span-3 bg-neutral-400 rounded-lg">
          <CardFour />
        </div>
        <div className="col-span-9 row-span-2 bg-neutral-400 rounded-lg">
          <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
            <h2 className="text-lg font-semibold text-slate-800 m-2 text-center">
              Saldo der letzten 5 Monate
            </h2>
          </div>
        </div>
        <div className="col-span-3 row-span-2 bg-neutral-400 rounded-lg">
          <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
            <h2 className="text-lg font-semibold text-slate-800 m-2">
              Wunschliste
              <CardSixSavingGoals />
            </h2>
          </div>
        </div>
        <div className="col-span-4 bg-neutral-400 rounded-lg"></div>
        <div className="col-span-4 bg-neutral-400 rounded-lg">
          <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
            <h2 className="text-lg font-semibold text-slate-800 m-2">Budget</h2>
            <CardEightBudget />
          </div>
        </div>
        <div className="col-span-4 bg-neutral-400 rounded-lg">
          <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
            <h2 className="text-lg font-semibold text-slate-800 m-2">
              Investments
            </h2>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Main;
