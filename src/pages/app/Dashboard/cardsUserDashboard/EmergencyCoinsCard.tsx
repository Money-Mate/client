import Notgroschen from "../chartsUserDasboard/Notgroschen";

function EmergencyCoins() {
  return (
    <div className="h-full rounded-md  bg-mm-foreground shadow-lg">
      <h2 className="m-2 mb-5 pt-3 text-center text-lg font-semibold text-mm-text-white">
        Notgroschen
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <Notgroschen />
      </div>
    </div>
  );
}

export default EmergencyCoins;
