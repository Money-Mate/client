import { BudgetChart } from "../chartsUserDasboard/BudgetChartRelative";

function BudgetExpenses() {
  return (
    <div className="h-full rounded-md bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-mm-text-white">
        Budget
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <BudgetChart />
      </div>
    </div>
  );
}

export default BudgetExpenses;
