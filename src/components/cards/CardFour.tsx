interface CardOneProps {
  saved: number;
}

const CardFour: React.FC<CardOneProps> = ({ saved }) => {
  return (
    <div className=" bg-white shadow-lg rounded-md border border-slate-200 h-full">
      <div className="px-5 pt-3">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Erspartes</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          April
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 m-2">{saved}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +2%
          </div>
        </div>
      </div>
      {/* {hier kann Ein Graph rein mit Chartjs} */}
    </div>
    
  );
}

export default CardFour;
