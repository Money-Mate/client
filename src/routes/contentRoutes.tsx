import UserDashboard from "../pages/app/Dashboard/UserDashboard";
import TransactionsGiro from "../pages/app/transactionsGiro/TransactionsGiro";
import UserProfilePage from "../pages/app/userProfile/UserProfilePage";
import InvestmentDashboard from "../pages/app/Investment/InvestmentDashboard";
import InvestmentForm from "../pages/app/Investment/InvestmentForm";


export const paths = {
  landingPage: "/landingpage",
  signIn: "/signin",
  signUp: "/signup",
  userDashboard: "/userdashboard",
  userprofile: "/userprofile",
  transactionsGiro: "/transactionsgiro",
  investmentDashboard: "/investmentdashboard",
  transactionsInvest: "/transactionsinvest",
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
    path: paths.userprofile,
    element: <UserProfilePage />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "userprofile",
  },
  {
    path: paths.transactionsGiro,
    element: <TransactionsGiro />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "TransactionsGiro",
  },
  {
    path: paths.investmentDashboard,
    element: <InvestmentDashboard />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "InvestmentDashboard",
  },
  {
    path: paths.transactionsInvest,
    element: <InvestmentForm/>,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "TransactionsInvest",
  }
];

export default routes;
