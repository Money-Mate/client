import { useEffect, useState } from "react";
import 'chart.js/auto'
import Investments from "./InvestmentsCard";
import AssetCard from "./AssetCard";
import {fetchCoin} from "./FetchKrypto";
import { fetchInvests } from "./Fetch";
import Trades from "./Trades";
import DividendCard from "./DividendCard";
import { transactions } from "./Transaktionen";



function InvestmentDashboard() {
    const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  
  useEffect(() => {
    fetchCoin();
    fetchInvests();
    console.log(transactions)
  }, []);

  return (
    <div className="mx-5 mb-5 grid min-h-fit gap-4 pt-3 sm:grid-cols-8 lg:grid-cols-12">
      
      <div className=" h-80 rounded-lg sm:col-span-8 lg:col-span-4">
        <Investments  />
     </div>
     <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-4">
      <DividendCard />
     </div>
     <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-4">
      <Trades />
     </div>
     <div className=" h-fit rounded-lg sm:col-span-8 lg:col-span-12">
        <AssetCard setClickedData={setClickedData} />
     </div>
    </div>
  );
}

export default InvestmentDashboard;