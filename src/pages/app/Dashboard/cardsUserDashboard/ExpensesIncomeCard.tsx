import ExpenseIncomeChart from "../chartsUserDasboard/ExpensesIncome";

function IncomeExpensesCard() {
  return (
    <div className="h-full rounded-md bg-mm-foreground">
      <h2 className="text-gradient m-2 bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text pt-3 text-center text-xl font-bold leading-tight text-transparent">
        Einnahmen/Ausgaben der letzten 6 Monate
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
        <ExpenseIncomeChart />
      </div>
    </div>
  );
}

export default IncomeExpensesCard;
