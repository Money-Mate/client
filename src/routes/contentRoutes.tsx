import BankAccounts from "../pages/app/userProfile/BankAccounts";
import TransactionsGiro from "../pages/app/transactionsGiro/TransactionsGiro";
import UserDashboard from "../pages/app/Dashboard/UserDashboard";

export const paths = {
  landingPage: "/landingpage",
  signIn: "/signin",
  signUp: "/signup",
  userDashboard: "/userdashboard",
  bankAccounts: "/bankaccounts",
  transactionsGiro: "/transactionsgiro",
};

const routes = [
  {
    path: paths.userDashboard,
    element: <UserDashboard />,
    isProtected: true,
    redirectPath: paths.signIn,
    id: "userDashboard",
  },
  {
    path: paths.bankAccounts,
    element: <BankAccounts />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "BankAccounts",
  },
  {
    path: paths.transactionsGiro,
    element: <TransactionsGiro />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "TransactionsGiro",
  },
];

export default routes;
