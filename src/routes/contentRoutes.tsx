import UserDashboard from "../pages/app/Dashboard/UserDashboard";
import TransactionsGiro from "../pages/app/transactionsGiro/TransactionsGiro";
import UserProfilePage from "../pages/app/userProfile/UserProfilePage";
import InvestmentDashboard from "../pages/app/Investment/InvestmentDashboard";
import Budgets from "../pages/app/Budget/Budgets";
import Wishes from "../pages/app/Wishes/Wishes";
import InvestmentForm from "../pages/app/Investment/InvestmentForm";
import FinancialOptionsPage from "../pages/app/Statistics/StatisticsPage";

export const paths = {
  landingPage: "/landingpage",
  signIn: "/signin",
  signUp: "/signup",
  userDashboard: "/userdashboard",
  userprofile: "/userprofile",
  transactionsGiro: "/transactionsgiro",
  investmentDashboard: "/investmentdashboard",
  budgets: "/budgets",
  wishes: "/wishes",
  transactionsInvest: "/transactionsinvest",
  financialHealthStatistics: "/statistics",
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
    path: paths.budgets,
    element: <Budgets />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "Budgets",
  },
  {
    path: paths.transactionsInvest,
    element: <InvestmentForm />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "TransactionsInvest",
  },
  {
    path: paths.wishes,
    element: <Wishes />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "Wishes",
  },
  {
    path: paths.financialHealthStatistics,
    element: <FinancialOptionsPage />,
    isProtected: true,
    redirectPath: paths.landingPage,
    id: "FinancialHealthStatistics",
  },
];

export default routes;
