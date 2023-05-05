import { ReactElement } from "react";
import ImageOne from "../../lib/FullDashboard.png"
import { TypeAnimation } from "react-type-animation";

function HeroSection(): ReactElement {
  return (
    <>
      <section className="flex-row bg-slate-200">
        <div className="container mx-auto">
          <div>
            {/* {text} */}
            <div>
              <h1>Hero Section</h1>
            </div>
            <div className="mb-6 text-[36px] lg:text-[60] font-semibold uppercase">
                <p>Wir sind</p>
                <span>Money </span>
                <TypeAnimation sequence={[
                    "Mate",
                    2000,
                    "Florian",
                    2000,
                    "Leonie",
                    2000,
                    "Sebastian",
                    2000,
                    "Quan",
                    2000,
                ]}
                speed={50}
                className="text-mm-secondary"
                wrapper="span"
                repeat={Infinity}

                />
            </div>
          </div>
          <div>
            <img src={ImageOne} alt="Dashboard-moneymate" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
