import React from "react";
// import {BudgetChart} from '../charts/BudgetChartAbsolute'
import { BudgetChart } from "../chartsUserDasboard/BudgetChartRelative";

function BudgetExpenses() {
  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Budget
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <BudgetChart />
      </div>
    </div>
  );
}

export default BudgetExpenses;
