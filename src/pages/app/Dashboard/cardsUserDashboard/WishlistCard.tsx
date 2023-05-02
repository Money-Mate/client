import { WunschlisteChart } from "../chartsUserDasboard/Wunschliste";

function WishlistCard() {
  return (
    <div className=" h-full rounded-md  bg-mm-foreground ">
      <h2 className="m-2 text-center text-lg font-semibold text-mm-text-white">
        Wunschliste
      </h2>
      <div className="flex h-48 w-full items-center justify-center p-1">
        <WunschlisteChart />
      </div>
    </div>
  );
}

export default WishlistCard;
