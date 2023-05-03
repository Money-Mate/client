import React from "react";
interface ProgressbarProps {
  percentage: number;
}

function Progressbar(props: ProgressbarProps) {
  const { percentage } = props;
  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full bg-teal-400`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default Progressbar;
