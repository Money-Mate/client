import React, { useEffect, useState } from "react";
import useBankAccountStore, {
  IBankAccountData,
} from "../../../../context/BankAccountsStore";
import HandleExistingBankAccounts from "../Modals/BankAccouts/HandleExistingBankAccounts";

const BankAccountsCard: React.FC = () => {
  const { bankAccountData, fetchBankAccountData, deleteBankAccount } =
    useBankAccountStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<IBankAccountData | null>(null);
  useEffect(() => {
    fetchBankAccountData();
  }, []);
  const handleAddClick = () => {
    setShowModal(true);
    setSelectedAccount(null);
  };
  const handleEditClick = (account: IBankAccountData) => {
    console.log(account);
    setShowModal(true);
    setSelectedAccount(account);
  };
  const handleDeleteClick = (id: string) => {
    deleteBankAccount(id);
  };
  const handleModalClose = () => {
    setShowModal(false);
    fetchBankAccountData();
  };

  const giroAccounts = bankAccountData?.filter(
    (account) => account.type === "giro"
  );
  const investAccounts = bankAccountData?.filter(
    (account) => account.type === "invest"
  );

  if (!bankAccountData) {
    return (
      <div>
        Kein Konto gefunden
        <button
          className="rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
          onClick={handleAddClick}
        >
          Konto hinzufügen
        </button>
      </div>
    );
  }
  return (
    <div className="mb-4 w-full rounded-md bg-mm-foreground p-4 shadow-lg">
      <div className="flex justify-between">
        <h2 className="mb-2 text-lg font-bold text-mm-text-white">Konten</h2>
        <button
          className="m-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
          onClick={handleAddClick}
        >
          Konto hinzufügen
        </button>
      </div>
      <div className="mb-2">
        <div className="m-4 flex flex-col">
          <h2 className="mb-1 font-bold text-mm-text-white">Girokonten</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {giroAccounts?.map((account: IBankAccountData) => (
              <div
                key={account._id}
                className="overflow-hidden border-2 border-mm-background shadow-lg"
              >
                <div className="p-4 ">
                  <h5 className="mb-2 text-lg font-bold text-mm-text-white">
                    {account.name}
                  </h5>
                  <p className="mb-2 h-5 w-10 text-gray-600">
                    {account.iban ? account.iban : ""}{" "}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="m-2 mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                      onClick={() => handleEditClick(account)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="m-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                      onClick={() => handleDeleteClick(account._id)}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-4 flex flex-col">
          <h2 className="mb-1 font-bold text-mm-text-white">
            Investmentkonten
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {investAccounts?.map((account: IBankAccountData) => (
              <div
                key={account._id}
                className="overflow-hidden border-2 border-mm-background shadow-lg"
              >
                <div className="p-4 ">
                  <h5 className="mb-2 text-lg font-bold text-mm-text-white">
                    {account.name}
                  </h5>
                  <p className="mb-2 h-5 w-10 text-gray-600">
                    {account.iban ? account.iban : ""}{" "}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="m-2 mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                      onClick={() => handleEditClick(account)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="m-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                      onClick={() => handleDeleteClick(account._id)}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showModal && (
          <HandleExistingBankAccounts
            account={selectedAccount}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};
export default BankAccountsCard;
