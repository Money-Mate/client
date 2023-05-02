import { useEffect, useState } from "react";
import { formatNumber } from "../../../../utils/formatterFunctions";
import Investments from "../chartsUserDasboard/Investments";

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
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-mm-text-white">
        Investments
      </h2>
      {!clickedData && (
        <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
          Total: {formatNumber(sum)}
        </p>
      )}
      {clickedData && (
        <div>
          <p className="m-2 text-center text-sm font-semibold text-mm-text-white">
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
