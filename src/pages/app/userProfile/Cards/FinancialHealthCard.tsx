import React, { useState } from "react";

const FinancialHealthCard: React.FC = () => {
  const [trackHabits, setTrackHabits] = useState(false);

  const handleTrackHabitsChange = () => {
    setTrackHabits(!trackHabits);
  };

  return (
    <div className="mb-4 w-full rounded-md bg-mm-foreground p-4 shadow-lg">
      <h2 className="mb-2 text-lg font-bold text-mm-text-white">
        Financial Health Habits
      </h2>
      <div className="flex flex-col">
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Track my monthly spending
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Track my net worth over time
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Get alerts when I overspend
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            30-50-20 rule: 30% of my income goes to needs, 50% to wants, 20% to
            savings
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthCard;
