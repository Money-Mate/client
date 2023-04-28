import { Route, Routes } from "react-router-dom";
import LayoutPage from "../src/pages/app/layouts/LayoutPage";
import LandingPage from "./pages/landingpage/LandingPage";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/register/SignUp";

function App() {
  return (
    <div className="App h-screen w-screen">
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
