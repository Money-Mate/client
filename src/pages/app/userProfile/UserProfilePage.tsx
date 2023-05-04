import React from "react";
import { useUserStore } from "../../../context/UserStore";
import BankAccountsCard from "../userProfile/Cards/BankAccountsCard";
import FinancialHealthCard from "../userProfile/Cards/FinancialHealthCard";
import ProfileCard from "../userProfile/Cards/ProfileCard";

const UserProfile: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="m-3 flex min-h-screen w-full flex-col items-center  bg-mm-background text-mm-text-dark">
      <ProfileCard user={user} />
      <BankAccountsCard />
      <FinancialHealthCard />
    </div>
  );
};

export default UserProfile;
