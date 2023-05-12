import Notgroschen from "../chartsUserDasboard/EmergencyFund";

function EmergencyCoins() {
  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Notgroschen
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <Notgroschen />
      </div>
    </div>
  );
}

export default EmergencyCoins;
