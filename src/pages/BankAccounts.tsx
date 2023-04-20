import React, { useEffect, useState } from "react";
import useAccountStore from "../context/Accountstore";
import { IBankAccountData } from "../context/Accountstore";

const BankAccounts = () => {
  const { bankAccountData, fetchBankAccountData, addBankAccount, updateBankAccount, deleteBankAccount } = useAccountStore();
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState<IBankAccountData>({ _id: "", name: "", iban: "", reference: "name"});

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, name: event.target.value });
  };

  const handleIbanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, iban: event.target.value });
  };

  const handleReferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewAccount({ ...newAccount, reference: event.target.value as "name"});
  };

  const handleAddAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addBankAccount(newAccount);
    setNewAccount({ _id: "", name: "", iban: "", reference: "name" });
  };

  const handleUpdateAccount = (event: React.MouseEvent<HTMLButtonElement>, account: IBankAccountData) => {
    event.preventDefault();
    console.log(account);
    updateBankAccount(account);
  };

  const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    deleteBankAccount(id);
    setShowModal(false)
  };

  useEffect(() => {
    fetchBankAccountData();
  }, []);

  return (
    <div>
      <h2>Bank Accounts</h2>
      <ul>
        {bankAccountData && bankAccountData.map((account) => (
          <li key={account._id}>
            <form>
              <label>
                Name:
                <input type="text" value={account.name} onChange={(event) => updateBankAccount({ ...account, name: event.target.value })} />
              </label>
              <label>
                IBAN:
                <input type="text" value={account.iban} onChange={(event) => updateBankAccount({ ...account, iban: event.target.value })} />
              </label>
              <label>
                Reference:
                <select value={account.reference} onChange={(event) => updateBankAccount({ ...account, reference: event.target.value as "name" | "iban" })}>
                  <option value="name">Name</option>
                  <option value="iban">IBAN</option>
                </select>
              </label>
              <button onClick={(event) => handleUpdateAccount(event, account)}>Update</button>
              <button onClick={()=> setShowModal(true)}>Delete</button>
            </form>
              {showModal && (
                <div>
                  <h1>Are you sure you want to delete this account?</h1>
                  <button onClick={() => setShowModal(false)}>No</button>
                  <button onClick={(event) => handleDeleteAccount(event, account._id) }>Yes</button>
                </div>
              )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddAccount}>
        <label>
          Name:
          <input type="text" value={newAccount.name} onChange={handleNameChange} />
        </label>
        <label>
          IBAN:
          <input type="text" value={newAccount.iban} onChange={handleIbanChange} />
        </label>
        <label>
          Reference:
          <select value={newAccount.reference} onChange={handleReferenceChange}>
            <option value="name">Name</option>
            <option value="iban">IBAN</option>
          </select>
        </label>
        <button type="submit">Add Account</button>
      </form>
    </div>
  );

}
export default BankAccounts;
























// import { useEffect } from "react";

// function BankAccounts() {
  //   const { bankAccountData, fetchBankAccountData, addBankAccount, updateBankAccount, deleteBankAccount } = useAccountStore();
  
  //   useEffect(() => {
    //     fetchBankAccountData();
    //   } , []);
    //   console.log(bankAccountData);

    //   if (!bankAccountData) {
      //     return <div>Loading...</div>;
      //   }
      
//   const handleAddBankAccount = (_id: string, name: string, iban: string, reference: "name") => {
  //     addBankAccount({_id, name, iban, reference})
  
  //   return (
//     <div className="grid lg:grid-cols-12 sm:grid-cols-8 grid-rows-4 gap-4 p-5">
//       {bankAccountData.map((account) => (
//         <div key={account._id} className="col-span-3 bg-neutral-400 rounded-lg">
//           <h1>Name: {account.name}</h1>
//           <p>IBAN: {account.iban}</p>
//           <p>Reference: {account.reference}</p>
//         </div>
//       ))}
//       <form  action=""> 
//         <input type="text" name="name" placeholder="Name" />
//         <input type="text" name="iban" placeholder="IBAN" />
//         <input type="text" name="reference" placeholder="Reference" />
//       </form>
//       <button onClick={() => handleAddBankAccount(_id, name, iban, reference)}>Add Bank Account</button>
//     </div>
//   )
// }
// }
// export default BankAccounts;