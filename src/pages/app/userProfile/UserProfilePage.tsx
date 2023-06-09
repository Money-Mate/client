import React from "react";
import { useUserStore } from "../../../context/UserStore";
import BankAccountsCard from "../userProfile/Cards/BankAccountsCard";
import ProfileCard from "../userProfile/Cards/ProfileCard";
import FinancialOptionsSettings from "./Cards/FinancialOptionsSettings";

const UserProfile: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="mx-5 max-w-screen rounded-lg">
      <div className="flex min-h-full w-full flex-col items-center bg-mm-background text-mm-text-dark">
        <ProfileCard user={user} />
        <BankAccountsCard />
        <FinancialOptionsSettings />
      </div>
    </div>
  );
};

export default UserProfile;
