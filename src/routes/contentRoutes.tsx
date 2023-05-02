import UserProfil from "../pages/app/userProfile/UserProfil";
import TransactionsGiro from "../pages/app/transactionsGiro/TransactionsGiro";
import UserDashboard from "../pages/app/Dashboard/UserDashboard";

export const paths = {
  landingPage: "/landingpage",
  signIn: "/signin",
  signUp: "/signup",
  userDashboard: "/userdashboard",
  userprofile: "/userprofile",
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
    path: paths.userprofile,
    element: <UserProfil />,
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
];

export default routes;
