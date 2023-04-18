import { useEffect } from "react";
import useAccountStore from "../context/Accountstore";

function BankAccounts() {
  const { bankAccountData, fetchBankAccountData } = useAccountStore();

  useEffect(() => {
    fetchBankAccountData();
  } , []);
  console.log(bankAccountData);

  if (!bankAccountData) {
    return <div>Loading...</div>;
  }

return (
    <div className="grid lg:grid-cols-12 sm:grid-cols-8 grid-rows-4 gap-4 p-5">
      <div className="col-span-3 bg-neutral-400 rounded-lg">
        <h1>Account</h1>
      </div>
     </div>
)
}

export default BankAccounts;
