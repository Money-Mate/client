import { useEffect, useState } from "react";
import { formatNumber } from "../../../../utils/formatterFunctions";
import ExpensesPie from "../chartsUserDasboard/ExpensesPie";
import useDashboardStore from "../../../../context/DashbordStore";


function ExpensesPieCard() {
  const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  const [sum, setSum] = useState(0);

  const lastSixMonthsExpensesByCategory = useDashboardStore(
    (state) => state.dashboardData?.lastSixMonthsExpensesByCategory
  );
  console.log(lastSixMonthsExpensesByCategory)

  if (lastSixMonthsExpensesByCategory === undefined) {
    return <div>Loading...</div>;
  }

  useEffect(() => {

  const sum = lastSixMonthsExpensesByCategory.reduce((acc, { amount }) => {
    return acc + amount;
    }, 0);
    
    setSum(sum);
  }, []);

  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Ausgaben
      </h2>
      {!clickedData && (
        <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
          Total: {formatNumber(sum)}
        </p>
      )}
      {clickedData && (
        <div>
          <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
            {clickedData?.label}: {formatNumber(clickedData?.value)}
          </p>
        </div>
      )}
      <div className="flex h-48 w-full items-center justify-center p-1">
        <ExpensesPie setClickedData={setClickedData} />
      </div>
    </div>
  );
}

export default ExpensesPieCard