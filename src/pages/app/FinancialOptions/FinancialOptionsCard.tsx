import React from 'react';
import { useUserStore } from '../../../context/UserStore';

const ChecklistCard = () => {
  const userStore = useUserStore();

  const handleCheckboxChange = (itemId: number) => {
    // userStore.toggleChecked(itemId);
  };

  return (
    <div className="p-4 bg-mm-background text-mm-text-white">
      {/* {userStore.user.checklistItems.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(item.id)}
            className="mr-2 form-checkbox text-mm-success focus:outline-none focus:ring-2 focus:ring-mm-primary"
          />
          <span className="flex items-center">
            {item.text}
            {item.checked && !item.conditionMet && (
              <span className="ml-1 text-xs text-mm-error">!</span>
            )}
          </span>
        </div>
      ))} */}
    </div>
  );
};

export default ChecklistCard;
