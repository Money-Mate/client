import React, { useState, useEffect } from 'react';
import '../index.css'; // import the Tailwind CSS file
import axios from 'axios';

const BankAccount = () => {
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [iban, setIban] = useState('');
  const [myAccounts, setMyAccounts] = useState([]);
  // const [allAccounts, setAllAccounts] = useState([]);
  const BE_URL = import.meta.env.VITE_BE_PORT;


  const addAccount = async () => {
    try {
      const response = await axios.post(`${BE_URL}/account/add`, {
        name,
        reference,
        iban
      }, { withCredentials: true });
      console.log(response.data);
      setName('');
      setReference('');
      setIban('');
    } catch (error) {
      console.error(error);
    }
  };

  const getMyAccounts = async () => {
    try {
      const response = await axios.get(`${BE_URL}/account/getAllMy`, { withCredentials: true });
      console.log(response.data);
      setMyAccounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getAllAccounts = async () => {
  //   try {
  //     const response = await axios.get('');
  //     console.log(response.data);
  //     setAllAccounts(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateMyAccount = async (accountId, data) => {
  //   try {
  //     const response = await axios.put(, {
  //       accountId,
  //       data
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const deleteMyAccountById = async (id) => {
  //   try {
  //     const response = await axios.delete(`${id}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getMyAccounts();
    // getAllAccounts();
  }, []);

  return (
    <div>
      <h2>Add Account</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Reference:
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          IBAN:
          <input
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </label>
      </div>
      <button onClick={addAccount}>Add Account</button>

      <h2>My Accounts</h2>
     <ul>
        {myAccounts.map((account) => (
          <li key={account}>
            {account}
           </li>
        ))}
      </ul> 
    </div>
  );
};

export default BankAccount
