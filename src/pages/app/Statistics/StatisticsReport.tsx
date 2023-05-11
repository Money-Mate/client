import React from "react";

const StatisticsReport: React.FC = () => {
  const data = {
    lastSixMonthsBalance: {
      labels: ["Dezember", "Januar", "Februar", "März", "April", "Mai"],
      data: [3005.75, 3000, 2985, -302.99, -706, -382],
    },
    lastSixMonthsIncomeAndExpenses: {
      labels: ["Dezember", "Januar", "Februar", "März", "April", "Mai"],
      data: {
        income: [3005.75, 3000, 3000, 0, 1510, 18],
        expenses: [0, 0, 15, 302.99, 2216, 400],
      },
    },
    bankBalance: 7599.76,
    saved: 7981.76,
    scheduledDebit: 0,
    balanceEndOfMonth: -382,
    expensesForThisMonth: -400,
    incomeForThisMonth: 18,
    wishlist: {
      Lebenswillen: {
        now: 7981.76,
        of: 1337,
        percent: 100,
        canAfford: true,
      },
      Flugzeugträger: {
        now: 7981.76,
        of: 13000000000,
        percent: 0,
        canAfford: false,
      },
      Haribo: {
        now: 7981.76,
        of: 55,
        percent: 100,
        canAfford: true,
      },
      Fahne: {
        now: 7981.76,
        of: 144,
        percent: 100,
        canAfford: true,
      },
    },
    emergencyFundPercent: 100,
    lastSixMonthsExpensesByCategory: [
      {
        category: "Leben",
        subCategory: "Friseur und Kosmetik",
        amount: 40,
      },
      {
        category: "Wohnen",
        subCategory: "Strom",
        amount: 100,
      },
      {
        category: "Auto",
        subCategory: "Wartung",
        amount: 200,
      },
      {
        category: "Freizeit",
        subCategory: "Hobbys",
        amount: 30,
      },
      {
        category: "Leben",
        subCategory: "Restaurant",
        amount: 30,
      },
      {
        category: "nicht zugewiesen",
        subCategory: "nicht zugewiesen",
        amount: 861,
      },
      {
        category: "Test",
        subCategory: "doch nicht?",
        amount: 45,
      },
      {
        category: "Freizeit",
        subCategory: "Sonstiges",
        amount: 400,
      },
      {
        category: "Freizeit",
        subCategory: "Bücher",
        amount: 25,
      },
      {
        category: "Einnahmen",
        subCategory: "Dividenden",
        amount: 15,
      },
      {
        category: "Arbeit",
        subCategory: "Kantine",
        amount: 20,
      },
      {
        category: "Wohnen",
        subCategory: "Miete",
        amount: 800,
      },
      {
        category: "Auto",
        subCategory: "Versicherung",
        amount: 150,
      },
      {
        category: "Sonstiges",
        subCategory: "Kreditraten",
        amount: 75,
      },
      {
        category: "Sonstiges",
        subCategory: "Bekleidung",
        amount: 50,
      },
      {
        category: "Wohnen",
        subCategory: "Internet",
        amount: 40,
      },
      {
        category: "Wohnen",
        subCategory: "Fernsehen",
        amount: 12.99,
      },
      {
        category: "Wohnen",
        subCategory: "Haushaltswaren",
        amount: 40,
      },
    ],
  };
  // Sort the expenses by amount (in descending order)
  const sortedExpenses = data.lastSixMonthsExpensesByCategory.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <div className="m-2 w-full bg-mm-foreground p-20 text-mm-text-white">
      <h2 className="mb-4 text-xl font-bold">Finanzbericht</h2>

      {/* Kontostand der letzten sechs Monate */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Kontostand der letzten sechs Monate
        </h3>
        <div className="flex">
          {data.lastSixMonthsBalance.labels.map(
            (label: string, index: number) => (
              <div
                key={index}
                className="m-1 flex-1 rounded-md border border-mm-foreground p-2 text-center"
              >
                <div className="text-xs text-mm-text-dark">{label}</div>
                <div className="text-lg">
                  {data.lastSixMonthsBalance.data[index]}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Einnahmen und Ausgaben der letzten sechs Monate */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Einnahmen und Ausgaben der letzten sechs Monate
        </h3>
        <div className="flex">
          {data.lastSixMonthsIncomeAndExpenses.labels.map(
            (label: string, index: number) => (
              <div
                key={index}
                className="m-1 flex-1 rounded-md border border-mm-foreground p-2 text-center"
              >
                <div className="text-xs text-mm-text-dark">{label}</div>
                <div className="text-lg">
                  <div className="text-mm-success">
                    {data.lastSixMonthsIncomeAndExpenses.data.income[index]}
                  </div>
                  <div className="text-mm-error">
                    {data.lastSixMonthsIncomeAndExpenses.data.expenses[index]}
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
          <div className="text-2xl">{data.bankBalance}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Gespart</h3>
          <div className="text-2xl">{data.saved}</div>
        </div>
        {/* Füge hier weitere Datenfelder hinzu */}
      </div>

      {/* Wunschliste */}
      <h3 className="mb-2 text-lg font-semibold">Wunschliste</h3>
      <div className="mb-6 grid grid-cols-2 gap-4">
        {Object.entries(data.wishlist).map(
          ([itemName, itemData]: [string, any]) => (
            <div key={itemName}>
              <h4 className="text-md font-semibold">{itemName}</h4>
              <div>
                <div>Jetzt: {itemData.now}</div>
                <div>Von: {itemData.of}</div>
                <div>Prozent: {itemData.percent}%</div>
                <div>
                  Kann sich leisten: {itemData.canAfford ? "Ja" : "Nein"}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Notfallfonds */}
      <h3 className="mb-2 text-lg font-semibold">Notfallfonds</h3>
      <div>Prozent: {data.emergencyFundPercent}%</div>

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
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsReport;
