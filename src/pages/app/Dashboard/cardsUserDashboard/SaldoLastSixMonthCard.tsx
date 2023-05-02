import Saldo from "../chartsUserDasboard/Saldo";

function SaldoLastSixMonth() {
  return (
    <div className="h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Saldo der letzten 6 Monate
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
        <Saldo />
      </div>
    </div>
  );
}

export default SaldoLastSixMonth;
