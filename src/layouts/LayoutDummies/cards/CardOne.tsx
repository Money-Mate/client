// placeholder stats
interface CardFourProps {
  bankBalance: number;
}

const CardFour: React.FC<CardFourProps> = ({ bankBalance }) => {
  return (
    <div className=" h-full rounded-md border border-slate-200 bg-white shadow-lg">
      <div className="px-5 pt-3">
        <h2 className="mb-2 text-lg font-semibold text-slate-800">
          Kontostand
        </h2>
        <div className="mb-1 text-xs font-semibold uppercase text-slate-400">
          August 2023
        </div>
        <div className="flex items-start">
          <div className="m-2 text-3xl font-bold text-slate-800">
            {bankBalance}
          </div>
          <div className="rounded-full bg-green-500 px-1.5 text-sm font-semibold text-white">
            +29%
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
  );
};

export default CardFour;
