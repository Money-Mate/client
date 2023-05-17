import Dividends from "./Dividends";


function DividendCard() {
  return (
    <div className="h-full rounded-md bg-mm-foreground">
      <h2 className="m-2 text-center text-gradient bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-xl font-bold leading-tight text-transparent pt-3">
        Dividenden
      </h2>
      <div className="flex h-60 w-full items-center justify-center p-1">
    <Dividends />
      </div>
    </div>
  );
}

export default DividendCard