import { useEffect, useState } from "react";
import 'chart.js/auto'
import Investments from "./InvestmentsCard";
import AssetCard from "./AssetCard";
import Fetch from "./Fetch";



function InvestmentDashboard() {
    const [clickedData, setClickedData] = useState<
    { label: string; value: number } | undefined
  >(undefined);
  

  return (
    <div className="mx-5 mb-5 grid min-h-fit gap-4 pt-3 sm:grid-cols-8 lg:grid-cols-12">
      
      <div className=" h-80 rounded-lg sm:col-span-8 lg:col-span-6">
        <Investments  />
     </div>
     <div className=" h-fit rounded-lg sm:col-span-4 lg:col-span-6">
        <AssetCard setClickedData={setClickedData} />
     </div>
     {/* <div className=" h-80 rounded-lg sm:col-span-8 lg:col-span-6">
        <Investments  />
     </div> */}
     <Fetch />
    </div>
  );
}

export default InvestmentDashboard;