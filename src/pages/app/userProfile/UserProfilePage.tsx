import React from "react";
import { useUserStore } from "../../../context/UserStore";
import BankAccountsCard from "../userProfile/Cards/BankAccountsCard";
import FinancialHealthCard from "../userProfile/Cards/FinancialHealthCard";
import ProfileCard from "../userProfile/Cards/ProfileCard";
import FinancialHealthTest from "./Cards/FinancialHealthTest";

const UserProfile: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="w-full">
      <div className="m-3 flex min-h-screen w-full flex-col items-center bg-mm-background text-mm-text-dark">
        <ProfileCard user={user} />
        <BankAccountsCard />
        <FinancialHealthCard />
        <FinancialHealthTest />
      </div>
    </div>
  );
};


export default UserProfile;
