import { useEffect, useState } from "react";
import Investments from "../chartsUserDasboard/Investments";
import { formatNumber } from "../../../utils/IntlAPI";

function CardNineInvestments() {
  const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  const [sum, setSum] = useState(0);

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
          Total: {formatNumber(sum)}
        </p>
      )}
      {clickedData && (
        <div>
          <p className="m-2 text-center text-sm font-semibold text-slate-800">
            {clickedData?.label}: {formatNumber(clickedData?.value)}
          </p>
        </div>
      )}
      <div className="flex h-48 w-full items-center justify-center p-1">
        <Investments setClickedData={setClickedData} />
      </div>
    </div>
  );
}

export default CardNineInvestments;
