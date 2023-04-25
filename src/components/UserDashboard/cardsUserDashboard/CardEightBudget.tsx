import React from "react";
// import {BudgetChart} from '../charts/BudgetChartAbsolute'
import { BudgetChart } from "../chartsUserDasboard/BudgetChartRelative";

function CardEightBudget() {
  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Budget
      </h2>
      <BudgetChart />
    </div>
  );
}

export default CardEightBudget;
