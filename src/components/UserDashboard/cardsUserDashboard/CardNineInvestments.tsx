import { useEffect, useState } from "react";
import Investments from "../chartsUserDasboard/Investments";


function CardNineInvestments() {

  const [clickedData, setClickedData] = useState<{label: string, value: number}| undefined>(undefined);
  const  [sum, setSum] = useState(0);


useEffect(() => {
  // hier in Zukunft fetch von Investkonten
  const stocks = 3000;
  const krypto = 2000;
  const realEstate = 4000;
  const sum = stocks + krypto + realEstate;
  setSum(sum);
}, []);

  return (
    <div className="h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Investments
      </h2>
      {!clickedData && (
      <p className="m-2 text-center text-sm font-semibold text-slate-800">
        Total: {sum} €
      </p>)}
      {clickedData && (
        <div>
          <p className="m-2 text-center text-sm font-semibold text-slate-800">{clickedData?.label}</p>
          <p className="m-2 text-center text-sm font-semibold text-slate-800">{clickedData?.value} €</p>
        </div>
      )}
      <div className="p-1 h-48 w-full flex justify-center items-center">
        <Investments setClickedData={setClickedData}/>
      </div>
    </div>
  );
}

export default CardNineInvestments;