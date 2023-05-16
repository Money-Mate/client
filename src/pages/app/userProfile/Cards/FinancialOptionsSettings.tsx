import React, { useState } from "react";
import { User, useUserStore } from "../../../../context/UserStore";

const FinancialOptionsSettings: React.FC = () => {
  const { user, updateUser } = useUserStore();

  const [emergencyFund, setEmergencyFund] = useState<number>(3000);
  const [needsPercentage, setNeedsPercentage] = useState<number>(50);
  const [wishesPercentage, setWishesPercentage] = useState<number>(30);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(20);
  const [error, setError] = useState<string | null>(null);
  const [showEmergencyFundInfo, setShowEmergencyFundInfo] = useState(false);
  const [showSplitIncomeInfo, setShowSplitIncomeInfo] = useState(false);

  const handleEmergencyFundInfoToggle = () => {
    setShowEmergencyFundInfo(!showEmergencyFundInfo);
  };

  const handleSplitIncomeInfoToggle = () => {
    setShowSplitIncomeInfo(!showSplitIncomeInfo);
  };

  console.log(user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalPercentage =
      needsPercentage + wishesPercentage + savingsPercentage;
    if (totalPercentage !== 100) {
      setError("Bitte teile insgesamt 100% auf.");
      return;
    }
    if (emergencyFund < 0) {
      setError("Bitte gib einen positiven Betrag ein.");
      return;
    }

    const updatedUser: User = {
      ...user,
      financialOptions: {
        emergencyFund,
        splitIncome: {
          needs: needsPercentage,
          wants: wishesPercentage,
          savings: savingsPercentage,
        },
      },
    };

    updateUser(updatedUser);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 w-full rounded-md bg-mm-foreground p-6 shadow-lg"
    >
      <h2 className="m-2 text-left text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3xt-lg">
        Einstellungen für die Finanzanalysen:
      </h2>
      <br />
      <h3 className="text-lg font-bold text-mm-text-white">
        <span className="inline-flex items-center">
          1. Notgroschen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1 h-4 w-4 cursor-pointer text-gray-400"
            onClick={handleEmergencyFundInfoToggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </span>
        {showEmergencyFundInfo && (
          <div className="mt-1 text-sm text-gray-500">
            Dein Monatseinkommen beträgt 2.000,00 €. 
            <br />
            Es wird empfohlen 3-6 Nettogehälter für unvorhergesehene Ausgaben zurückzulegen.
          </div>
        )}
      </h3>
      <div className="mb-4 p-2 shadow-lg">
        <label
          htmlFor="emergencyFund"
          className="mb-2 block p-2 font-medium text-mm-text-dark"
        >
          in €
        </label>
        <input
          type="number"
          id="emergencyFund"
          value={emergencyFund}
          onChange={(e) => setEmergencyFund(Number(e.target.value))}
          className="w-30 ml-4 rounded-md border border-gray-300 px-3 py-2 "
          required
        />
      </div>

      <br></br>
      <h3 className="mb-2 text-lg font-bold text-mm-text-white">
        <span className="inline-flex items-center">
          2. Angestrebte Aufteilung des Einkommens
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1 h-4 w-4 cursor-pointer text-gray-400"
            onClick={handleSplitIncomeInfoToggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </span>
        {showSplitIncomeInfo && (
          <div className="mt-1 mb-2 text-sm text-gray-500">
            Es wird empfohlen 50% des Einkommens für Notwendiges, 30% für Wünsche und 20% für Investitionen zu verwenden.
          </div>
        )}
      </h3>

      <div className="mb-4 ml-4 ">
        <label
          htmlFor="needsPercentage"
          className="mb-2 block font-medium text-mm-text-dark"
        >
          % des Einkommens für Notwendiges
        </label>
        <input
          type="number"
          id="needsPercentage"
          value={needsPercentage}
          onChange={(e) => setNeedsPercentage(Number(e.target.value))}
          className="w-30 rounded-md border border-gray-300 px-3 py-2 text-mm-text-dark"
          required
        />
      </div>

      <div className="mb-4 ml-3">
        <label
          htmlFor="wishesPercentage"
          className="mb-2 block font-medium text-mm-text-dark"
        >
          % des Einkommens für Wünsche
        </label>
        <input
          type="number"
          id="wishesPercentage"
          value={wishesPercentage}
          onChange={(e) => setWishesPercentage(Number(e.target.value))}
          className="w-30 rounded-md border border-gray-300 px-3 py-2 text-mm-text-dark"
          required
        />
      </div>

      <div className="mb-4 ml-4">
        <label
          htmlFor="savingsPercentage"
          className="mb-2 block font-medium text-mm-text-dark"
        >
          & des Einkommens Sparen und Investieren
        </label>
        <input
          type="number"
          id="savingsPercentage"
          value={savingsPercentage}
          onChange={(e) => setSavingsPercentage(Number(e.target.value))}
          className="w-30 rounded-md border border-gray-300 px-3 py-2 text-mm-text-dark"
          required
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="m-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
        >
          Speichern
        </button>
      </div>
    </form>
  );
};

export default FinancialOptionsSettings;
