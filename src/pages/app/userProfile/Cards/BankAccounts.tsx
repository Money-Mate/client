import { useEffect, useState } from "react";
import useBankAccountStore, {
  IBankAccountData,
} from "../../../../context/BankAccountsStore";
import HandleExistingBankAccounts from "../Modals/BankAccouts/HandleExistingBankAccounts";

const BankAccounts = () => {
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
  if (!bankAccountData) {
    return (
      <div>
        Kein Konto gefunden
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleAddClick}
        >
          Konto hinzufügen
        </button>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">My Bank Accounts</h1>
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleAddClick}
      >
        Konto hinzufügen
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bankAccountData.map((account: IBankAccountData) => (
          <div
            key={account._id}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <div className="p-4">
              <h5 className="mb-2 text-lg font-bold">{account.name}</h5>
              <p className="mb-2 text-gray-600">{account.iban}</p>
              <button
                className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => handleEditClick(account)}
              >
                Bearbeiten
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                onClick={() => handleDeleteClick(account._id)}
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <HandleExistingBankAccounts
          account={selectedAccount}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};
export default BankAccounts;
