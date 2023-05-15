import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const BE_URL = import.meta.env.VITE_BE_PORT;
        const response = await axios.get(`${BE_URL}/user/checkToken`, {
          withCredentials: true,
        });
        if (response.data === true) {
          navigate("/app/userdashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <>
      <section className=" flex min-h-[100vh] items-center bg-mm-background">
        <div className="container mx-auto">
          <div className="flex flex-col gap-y-8 bg-mm-background p-10 lg:items-center ">
            {/* {text} */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[55px] font-bold leading-[0.8] lg:text-[100px]">
                Money Mate
              </h1>
            </div>
            <div className="mb-6 text-center text-[36px] font-semibold uppercase lg:text-[60]">
              <p className="mr-4">Wir sind</p>
              <span>Money </span>
              <TypeAnimation
                sequence={[
                  "Mate",
                  2500,
                  "Florian",
                  2500,
                  "Leonie",
                  2500,
                  "Sebastian",
                  2500,
                  "Quan",
                  2500,
                ]}
                speed={50}
                className="text-mm-success"
                wrapper="span"
                repeat={Infinity}
              />
            </div>
            <p className="mx-auto mb-8 max-w-lg lg:mx-0">
              Mit Money Mate könnt ihr ganz einfach eure Finanzen im Auge
              behalten.
            </p>
          </div>
          <div className="mx-auto mb-12 flex items-center justify-center gap-x-6 bg-mm-background lg:mx-0">
            {" "}
            <button
              className="m-4 rounded-full bg-mm-foreground px-4 py-2 font-bold text-white hover:bg-mm-success"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="m-4 rounded-full bg-mm-foreground px-4 py-2 font-bold text-white hover:bg-mm-success"
              onClick={() => navigate("/signup")}
            >
              Join now!
            </button>
          </div>

          <div className=" lg:max-[900px]: hidden max-w-[320px] flex-1 lg:flex">
            {/* <img src={ImageOne} alt="Dashboard-moneymate" /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
