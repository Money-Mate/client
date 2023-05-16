interface ProgressbarProps {
  percentage: number;
  color: string;
  isLimited: boolean;
}

function Progressbar(props: ProgressbarProps) {
  const { percentage, color, isLimited } = props;

  // red/light teal color  if percentage is higher than 80%
  let barColor = color;
  if (isLimited && percentage > 80) {
    barColor = "bg-violet-400";
  }
  if (!isLimited && percentage > 80) {
    barColor = "bg-teal-400";
  }

  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Progressbar;
