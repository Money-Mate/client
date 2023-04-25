
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/LayoutPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import LayoutPage from "./layouts/LayoutPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="App w-screen h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app/*" element={<LayoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
