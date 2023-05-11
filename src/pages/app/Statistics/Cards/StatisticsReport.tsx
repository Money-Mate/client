import React, { useEffect } from "react";
import useDashboardStore, {
} from "../../../../context/DashboardStore";



const StatisticsReport: React.FC = () => {
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const fetchDashboardData = useDashboardStore(
    (state) => state.fetchDashboardData
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (!dashboardData) {
    return <div>Loading...</div>; 
  }
  const {
    lastSixMonthsBalance,
    lastSixMonthsIncomeAndExpenses,
    bankBalance,
    saved,
    lastSixMonthsExpensesByCategory,
    wishlist,
    emergencyFundPercent,
  } = dashboardData;

  const formatCurrency = (amount: number) => {
    const formattedAmount = amount.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount.endsWith(",00")
      ? formattedAmount.replace(",00", "")
      : formattedAmount;
  };

  // Sort the expenses by amount (in descending order)
  const sortedExpenses = lastSixMonthsExpensesByCategory.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <div className="w-full rounded bg-mm-foreground p-4 text-mm-text-white md:p-20">
      <h2 className="mb-4 text-xl font-bold">Finanzbericht</h2>

      {/* Kontostand der letzten sechs Monate */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Kontostand der letzten sechs Monate
        </h3>
        <div className="flex flex-wrap justify-start lg:flex-nowrap">
          {lastSixMonthsBalance.labels.map((label: string, index: number) => (
            <div
              key={index}
              className="m-1 w-full rounded-md border border-mm-foreground p-2 text-center sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              <div className="text-xs text-mm-text-dark">{label}</div>
              <div className="text-lg">
                {formatCurrency(lastSixMonthsBalance.data[index])}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Einnahmen und Ausgaben der letzten sechs Monate */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Einnahmen und Ausgaben der letzten sechs Monate
        </h3>
        <div className="flex flex-wrap justify-start lg:flex-nowrap">
          {lastSixMonthsIncomeAndExpenses.labels.map(
            (label: string, index: number) => (
              <div
                key={index}
                className="m-1 w-full rounded-md border border-mm-foreground p-2 text-center sm:w-1/2 md:w-1/3 lg:w-1/6"
              >
                <div className="text-xs text-mm-text-dark">{label}</div>
                <div className="text-lg">
                  <div className="text-mm-success">
                    {formatCurrency(
                      lastSixMonthsIncomeAndExpenses.data.income[index]
                    )}
                  </div>
                  <div className="text-mm-error">
                    {formatCurrency(
                      lastSixMonthsIncomeAndExpenses.data.expenses[index]
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Weitere finanzielle Daten */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Kontostand</h3>
          <div className="text-2xl">{formatCurrency(bankBalance)}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Gespart</h3>
          <div className="text-2xl">{formatCurrency(saved)}</div>
        </div>
        {/* Füge hier weitere Datenfelder hinzu */}
      </div>

      {/* Wunschliste */}
      <h3 className="mb-2 text-lg font-semibold">Wunschliste</h3>
      <div className="mb-6 grid grid-cols-2 gap-4">
        {Object.entries(wishlist).map(([itemName, itemData]: [string, any]) => (
          <div key={itemName}>
            <h4 className="text-md font-semibold">{itemName}</h4>
            <div>
              <div>Jetzt: {formatCurrency(itemData.now)}</div>
              <div>Von: {formatCurrency(itemData.of)}</div>
              <div>Prozent: {itemData.percent}%</div>
              <div>Kann sich leisten: {itemData.canAfford ? "Ja" : "Nein"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Notfallfonds */}
      <h3 className="mb-2 text-lg font-semibold">Notfallfonds</h3>
      <div>Prozent: {emergencyFundPercent}%</div>

      {/* Ausgaben der letzten sechs Monate nach Kategorie */}
      <div className="mb-6 mt-2">
        <h3 className="text-lg font-semibold">
          Ausgaben der letzten sechs Monate nach Kategorie
        </h3>
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="text-left">Kategorie</th>
              <th className="text-left">Unterkategorie</th>
              <th className="text-left">Betrag</th>
            </tr>
          </thead>

          <tbody>
            {sortedExpenses.map((expense: any, index: number) => (
              <tr key={index}>
                <td>{expense.category}</td>
                <td>{expense.subCategory}</td>
                <td>{formatCurrency(expense.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsReport;
