import { useEffect, useState } from "react";
import useAccountStore, { IBankAccountData } from "../context/Accountstore";
import HandleExistingBankAccounts from "../components/Modals/HandleExistingBankAccounts";


const BankAccounts = () => {


  const { bankAccountData, fetchBankAccountData, deleteBankAccount } =
    useAccountStore();
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
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Bank Accounts</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddClick}
      >
        Konto hinzufügen
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bankAccountData.map((account: IBankAccountData) => (
          <div
            key={account._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <h5 className="text-lg font-bold mb-2">{account.name}</h5>
              <p className="text-gray-600 mb-2">{account.iban}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleEditClick(account)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteClick(account._id)}
              >
                Delete
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
