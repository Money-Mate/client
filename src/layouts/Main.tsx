import CardFour from "../components/cards/CardFour";
import CardOne from "../components/cards/CardOne";
import CardEightBudget from "../components/cards/CardEightBudget";
import CardThree from "../components/cards/CardThree";
import CardTwo from "../components/cards/CardTwo";
import CardSixSavingGoals from "../components/cards/CardSixSavingGoals";
import CardFiveSaldo from "../components/cards/CardFiveSaldo";
import CardSevenNotgroschen from "../components/cards/CardSevenNotgroschen";

type MainProps = {
  children: React.ReactNode;
};


function Main({children} : MainProps) {
  return (
    <>
    {children}
    </>

)
}

export default Main;
