import Dividends from "./Dividends";


function DividendCard() {
  return (
    <div className="h-full rounded-md bg-mm-foreground">
      <h2 className="m-2 mb-5 text-center text-lg font-semibold text-mm-text-white pt-3">
        Dividenden
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
    <Dividends />
      </div>
    </div>
  );
}

export default DividendCard