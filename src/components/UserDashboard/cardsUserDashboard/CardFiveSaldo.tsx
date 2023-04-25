import Saldo from "../chartsUserDasboard/Saldo";

function CardFiveSaldo() {
  return (
    <div className="h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Saldo der letzten 6 Monate
      </h2>
      <div className="p-1 h-60 w-full flex justify-center items-center">
      <Saldo />
      </div>
    </div>
  );
}

export default CardFiveSaldo;
