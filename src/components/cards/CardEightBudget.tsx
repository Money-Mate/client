import React from 'react'
// import {BudgetChart} from '../charts/BudgetChartAbsolute'
import {BudgetChart} from '../charts/BudgetChartRelative'

function CardSixBudget() {
  return (

        <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
          <BudgetChart />
        </div>
      );
}

export default CardSixBudget