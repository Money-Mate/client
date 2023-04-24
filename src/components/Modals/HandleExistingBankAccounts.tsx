import React, { useState, useEffect } from 'react';
import useAccountStore, { IBankAccountData } from '../../context/Accountstore';

interface IProps {
  account?: IBankAccountData | null;
  onClose: () => void;
}
function HandleExistingBankAccounts({ account, onClose }: IProps) {
  const { addBankAccount, updateBankAccount } = useAccountStore();
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const [reference, setReference] = useState('name');
  useEffect(() => {
    if (account) {
      setName(account.name);
      setIban(account.iban);
      setReference(account.reference);
    }
  }, [account]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'iban') {
      setIban(value);
    } else if (name === 'reference') {
      setReference(value);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newAccount: IBankAccountData = { name, iban, reference: "name" || "iban", _id: account?._id ?? '' };
      console.log("account", account)
      console.log("newAccount", newAccount)
      if (account) {
        await updateBankAccount({ _id: account._id, data: newAccount });
      } else {
        await addBankAccount(newAccount);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save account', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="iban">
          IBAN
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="iban"
          type="text"
          name="iban"
          value={iban}
          onChange={handleChange}
          placeholder="IBAN"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="reference">
          Reference
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="reference"
          name="reference"
          value={reference}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="iban">IBAN</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            Abbrechen
          </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
            {account ? 'Speichern' : 'Hinzufügen'}
          </button>
        </div>
      </form>
    );
  }
  export default HandleExistingBankAccounts;