import React from "react";
import { WunschlisteChart } from "../chartsUserDasboard/Wunschliste";

function WishlistCard() {
  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Wunschliste
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <WunschlisteChart />
      </div>
    </div>
  );
}

export default WishlistCard;
