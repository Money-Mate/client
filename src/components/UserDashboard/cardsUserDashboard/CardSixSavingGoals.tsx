import React from "react";
import { WunschlisteChart } from "../chartsUserDasboard/Wunschliste";

function WunschlisteCard() {
  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Wunschliste
      </h2>
      <WunschlisteChart />
    </div>
  );
}

export default WunschlisteCard;
