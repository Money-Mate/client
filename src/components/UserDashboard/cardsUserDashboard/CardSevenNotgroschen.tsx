import Notgroschen from "../chartsUserDasboard/Notgroschen";

function CardSevenNotgroschen() {
  return (
    <div className="h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <h2 className="m-2 text-center text-lg font-semibold text-slate-800">
        Notgroschen
      </h2>
      <div className="p-1 h-48 w-full flex justify-center items-center">
        <Notgroschen />
      </div>
    </div>
  );
}

export default CardSevenNotgroschen;
