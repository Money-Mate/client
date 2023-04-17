import UserDashboard from "../pages/UserDashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import { useUserStore } from "../context/userContext";


export const paths = {
  landingPage: '/',
  userDashboard: '/userdashboard',
  signIn: '/signin',
  signUp: '/signup',
};

const routes = [

  {
    path: paths.userDashboard,
    element: <UserDashboard />,
    isProtected: true,
    redirectPath: paths.signIn,
    id: 'userDashboard',
  }
];

export default routes;