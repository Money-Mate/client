import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const BE_URL= import.meta.env.VITE_BE_PORT;
        const response = await axios.get(`${BE_URL}/user/checkToken`, {
          withCredentials: true,
        });
        if (response.data === true ) {
          navigate('/app/userdashboard');
        }
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={() => navigate('/signin')}>Sign In</button>
      <button onClick={() => navigate('/signup')}>Register</button>
    </div>
  );
}

export default LandingPage;
