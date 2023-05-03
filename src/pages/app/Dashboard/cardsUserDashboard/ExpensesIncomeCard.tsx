import ExpenseIncomeChart from "../chartsUserDasboard/ExpensesIncome";


function IncomeExpensesCard() {
  return (
    <div className="h-full rounded-md bg-mm-foreground">
      <h2 className="m-2 text-center text-lg font-semibold text-mm-text-white">
        Saldo der letzten 6 Monate
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
        <ExpenseIncomeChart />
      </div>
    </div>
  );
}

export default IncomeExpensesCard;
