import Saldo from "../chartsUserDasboard/Saldo";

function SaldoLastSixMonth() {
  return (
    <div className="h-full rounded-md bg-slate-900">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-50">
        Saldo der letzten 6 Monate
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
        <Saldo />
      </div>
    </div>
  );
}

export default SaldoLastSixMonth;
