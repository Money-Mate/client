
function BankAccounts() {
  return (
    <>
      <div className="grid grid-rows-4 gap-4 p-5 sm:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-3 rounded-lg bg-neutral-400">
          {/* <CardOne /> */}
        </div>
        <div className="col-span-3  rounded-lg bg-neutral-400">
          {/* <CardTwo /> */}
        </div>
        <div className="col-span-3 rounded-lg bg-neutral-400">
          {/* <CardThree /> */}
        </div>
        <div className="col-span-3 rounded-lg bg-neutral-400">
          {/* <CardFour /> */}
        </div>
        <div className="col-span-9 row-span-2 rounded-lg bg-neutral-400">
          <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
            <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
              Saldo der letzten 6 Monate
              {/* <CardFiveSaldo /> */}
            </h2>
          </div>
        </div>
        <div className="col-span-3 row-span-2 rounded-lg bg-neutral-400">
          <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
            <h2 className="m-2 text-lg font-semibold text-slate-800">
              Wunschliste
              {/* <CardSixSavingGoals /> */}
            </h2>
          </div>
        </div>
        <div className="col-span-4 rounded-lg bg-neutral-400">
          <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
            <h2 className="m-2 text-lg font-semibold text-slate-800">
              Notgroschen
            </h2>

            {/* <CardSevenNotgroschen /> */}
          </div>
        </div>
        <div className="col-span-4 rounded-lg bg-neutral-400">
          <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
            <h2 className="m-2 text-lg font-semibold text-slate-800">Budget</h2>
            {/* <CardEightBudget /> */}
          </div>
        </div>
        <div className="col-span-4 rounded-lg bg-neutral-400">
          <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
            <h2 className="m-2 text-lg font-semibold text-slate-800">
              Investments
            </h2>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default BankAccounts;
