import axios from "axios";
import React, { useEffect, useState } from "react";


interface IBankAccountData {
  _id: string;
  name: string;
  iban: string;
  reference: "name" | "iban";

}

const BE_URL = import.meta.env.VITE_BE_PORT

const BankAccounts = () => {

  const [bankAccountData, setBankAccountData] = useState<IBankAccountData[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${BE_URL}/account/getAllMy`,{ withCredentials: true });

      setBankAccountData(response.data);
    } catch (error) {
      console.log(error);
    }

useEffect(() => {
  fetchAccounts();
}, []);

const addAccount = async (newAccount: IBankAccountData) => {
  try {
    const response = await axios.post(`${BE_URL}/accounts/add`, newAccount, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }

  const updateAccount = async (account: IBankAccountData) => {
    try {
      const response = await axios.put(`${BE_URL}/accounts/updateMy`, account, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }

    const deleteAccount = async (id: string) => {
      try {
        const response = await axios.delete(`${BE_URL}/accounts/delete/${id}`, { withCredentials: true });
      } catch (error) {
        console.log(error);
      }




      export default BankAccounts;


// import React, { useEffect, useState } from "react";
// import useAccountStore from "../context/Accountstore";
// import { IBankAccountData } from "../context/Accountstore";

// const BankAccounts = () => {
//   const { bankAccountData, fetchBankAccountData, addBankAccount, updateBankAccount, deleteBankAccount } = useAccountStore();
//   const [showModal, setShowModal] = useState(false);
//   const [newAccount, setNewAccount] = useState<IBankAccountData>({ _id: "", name: "", iban: "", reference: "name"});

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewAccount({ ...newAccount, name: event.target.value });
//   };

//   const handleIbanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewAccount({ ...newAccount, iban: event.target.value });
//   };

//   const handleReferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setNewAccount({ ...newAccount, reference: event.target.value as "name" | "iban"});
//   };

//   const handleAddAccount = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     addBankAccount(newAccount);
//     setNewAccount({ _id: "", name: "", iban: "", reference: "name" });
//   };

//   const handleUpdateAccount = (event: React.MouseEvent<HTMLButtonElement>, account: IBankAccountData) => {
//     event.preventDefault();
//     console.log(account);
//     updateBankAccount(account);
//   };

//   const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
//     event.preventDefault();
//     deleteBankAccount(id);
//     setShowModal(false)
//   };

//   useEffect(() => {
//     fetchBankAccountData();
//   }, []);

//   return (
//     <div>
//       <h2>Bank Accounts</h2>
//       <ul>
//         {bankAccountData && bankAccountData.map((account) => (
//           <li key={account._id}>
//             <form>
//               <label>
//                 Name:
//                 <input type="text" value={account.name} onChange={(event) => updateBankAccount({ ...account, name: event.target.value })} />
//               </label>
//               <label>
//                 IBAN:
//                 <input type="text" value={account.iban} onChange={(event) => updateBankAccount({ ...account, iban: event.target.value })} />
//               </label>
//               <label>
//                 Reference:
//                 <select value={account.reference} onChange={(event) => updateBankAccount({ ...account, reference: event.target.value as "name" | "iban" })}>
//                   <option value="name">Name</option>
//                   <option value="iban">IBAN</option>
//                 </select>
//               </label>
//               <button onClick={(event) => handleUpdateAccount(event, account)}>Update</button>
//               <button onClick={()=> setShowModal(true)}>Delete</button>
//             </form>
//               {showModal && (
//                 <div>
//                   <h1>Are you sure you want to delete this account?</h1>
//                   <button onClick={() => setShowModal(false)}>No</button>
//                   <button onClick={(event) => handleDeleteAccount(event, account._id) }>Yes</button>
//                 </div>
//               )}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleAddAccount}>
//         <label>
//           Name:
//           <input type="text" value={newAccount.name} onChange={handleNameChange} />
//         </label>
//         <label>
//           IBAN:
//           <input type="text" value={newAccount.iban} onChange={handleIbanChange} />
//         </label>
//         <label>
//           Reference:
//           <select value={newAccount.reference} onChange={handleReferenceChange}>
//             <option value="name">Name</option>
//             <option value="iban">IBAN</option>
//           </select>
//         </label>
//         <button type="submit">Add Account</button>
//       </form>
//     </div>
//   );

// }
// export default BankAccounts;
























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