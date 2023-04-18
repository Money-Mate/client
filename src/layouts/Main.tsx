import CardFour from "../components/cardsUserDashboard/CardFour";
import CardOne from "../components/cardsUserDashboard/CardOne";
import CardEightBudget from "../components/cardsUserDashboard/CardEightBudget";
import CardThree from "../components/cardsUserDashboard/CardThree";
import CardTwo from "../components/cardsUserDashboard/CardTwo";
import CardSixSavingGoals from "../components/cardsUserDashboard/CardSixSavingGoals";
import CardFiveSaldo from "../components/cardsUserDashboard/CardFiveSaldo";
import CardSevenNotgroschen from "../components/cardsUserDashboard/CardSevenNotgroschen";

type MainProps = {
  children: React.ReactNode;
};

function Main({ children }: MainProps) {
  return <>{children}</>;
}

export default Main;
