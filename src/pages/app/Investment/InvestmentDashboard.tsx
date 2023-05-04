import { useEffect } from "react";

import 'chart.js/auto'
import Investments from "./InvestmentsCard";


function InvestmentDashboard() {
  

  

  return (
    <div className="mx-5 mb-5 grid min-h-fit gap-4 pt-3 sm:grid-cols-8 lg:grid-cols-12">
      
      <div className=" h-80 rounded-lg sm:col-span-8 lg:col-span-12">
        <Investments  />
     </div>
     
    </div>
  );
}

export default InvestmentDashboard;