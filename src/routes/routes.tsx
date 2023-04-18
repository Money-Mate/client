import UserDashboard from "../pages/UserDashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import { useUserStore } from "../context/userContext";
import BankAccounts from "../pages/BankAccounts";
import TransactionsGiro from "../pages/TransactionsGiro";


export const paths = {
  landingPage: '/landingpage',
  signIn: '/signin',
  signUp: '/signup',
  userDashboard: '/userdashboard',
  bankAccounts: '/bankaccounts',
  transactionsGiro: '/transactionsgiro',
};

const routes = [

  {
    path: paths.userDashboard,
    element: <UserDashboard />,
    isProtected: true,
    redirectPath: paths.signIn,
    id: 'userDashboard',
  },{
    path: paths.bankAccounts,
    element: <BankAccounts />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: 'BankAccounts',
  },{
    path: paths.transactionsGiro,
    element: <TransactionsGiro />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: 'TransactionsGiro',
  }
];

export default routes;