import UserDashboard from "../pages/UserDashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import { useUserStore } from "../context/userContext";

export const paths = {
  landingPage: "/",
  userDashboard: "/userdashboard",
  signIn: "/signin",
  signUp: "/signup",
};

export const AllRoutes = () => {
  const isLoggedIn = useUserStore((state: { isLoggedIn: boolean }) => state.isLoggedIn)

  const routes = [
    // protected routes
    {
      path: paths.userDashboard,
      element: <UserDashboard />,
      isProtected: !isLoggedIn,
      redirectPath: paths.signIn,
      id: paths.userDashboard,
    },
    // public routes
    {
      path: paths.landingPage,
      element: <LandingPage />,
      isProtected: isLoggedIn,
    },
    {
      path: paths.signIn,
      element: <SignIn />,
      isProtected: isLoggedIn,
      redirectPath: null,
      id: paths.signIn,
    },
    {
      path: paths.signUp,
      element: <SignUp />,
      isProtected: isLoggedIn,
      redirectPath: null,
      id: paths.signUp,
    },
  ];
  const logroutes = () => {
    routes.forEach((route) =>
      console.log(`http://localhost:5173/#${route.path}`)
    );
  };
  return {
    routes,
    logroutes,
  };
};

export default AllRoutes;
