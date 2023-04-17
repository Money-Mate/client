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
  // protected routes
  {
    path: paths.userDashboard,
    element: <UserDashboard />,
    isProtected: true,
    redirectPath: paths.signIn,
    id: 'userDashboard',
  },
  // public routes
  {
    path: paths.landingPage,
    element: <LandingPage />,
    isProtected: false,
    redirectPath: paths.userDashboard,
    id: 'landingPage',
  },
  {
    path: paths.signIn,
    element: <SignIn />,
    isProtected: false,
    redirectPath: null,
    id: 'signIn',
  },
  {
    path: paths.signUp,
    element: <SignUp />,
    isProtected: false,
    redirectPath: null,
    id: 'signUp',
  },
];

export default routes;