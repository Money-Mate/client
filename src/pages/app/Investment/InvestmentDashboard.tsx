import { useEffect, useState } from "react";
import 'chart.js/auto'
import Investments from "./InvestmentsCard";
import AssetCard from "./AssetCard";
import {fetchCoin} from "./FetchKrypto";
import { fetchInvests } from "./Fetch";
import Trades from "./Trades";
import DividendCard from "./DividendCard";
import Nasdaq from "./Nasdaq";
import Dax from "./Dax";




function InvestmentDashboard() {
    const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  
  useEffect(() => {
    fetchCoin();
    fetchInvests();
  }, []);

  return (
    <div className="mx-2 grid min-h-fit gap-4 pt-1 p-3 sm:grid-cols-8 lg:grid-cols-12">
      
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
     <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-6">
        <Nasdaq />
     </div>
     <div className="h-80 rounded-lg sm:col-span-8 lg:col-span-6">
        <Dax />
     </div>
    </div>
  );
}

export default InvestmentDashboard;