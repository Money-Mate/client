import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/formatterFunctions";
import Investments from "./Investments";
import { invests } from "./Investdata";

function CardNineInvestments() {
  const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // hier in Zukunft fetch von Investkonten
    const stocks = invests.filter((invest) => invest.type === "Aktien/ETF's").reduce((acc, curr) => acc + curr.value, 0)
    const crypto = invests.filter((invest) => invest.type === "Kryptowährungen").reduce((acc, curr) => acc + curr.value, 0)
    const realEstate = invests.filter((invest) => invest.type === "Immobilien").reduce((acc, curr) => acc + curr.value, 0)
    const commodities = invests.filter((invest) => invest.type === "Rohstoffe").reduce((acc, curr) => acc + curr.value, 0)
    const sum = stocks + crypto + realEstate + commodities
    setSum(sum);
  }, []);

  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Investitionen
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
