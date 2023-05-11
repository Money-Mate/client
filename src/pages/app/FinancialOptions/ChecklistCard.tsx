import React, { useState } from 'react';

const ChecklistCard = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', checked: false, conditionMet: false },
    { id: 2, text: 'Item 2', checked: false, conditionMet: true },
    { id: 3, text: 'Item 3', checked: false, conditionMet: false },
    { id: 4, text: 'Item 4', checked: false, conditionMet: true },
    { id: 5, text: 'Item 5', checked: false, conditionMet: false },
  ]);

  const handleCheckboxChange = (itemId: number) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="p-4 bg-mm-background text-mm-text-white">
      {items.map(item => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(item.id)}
            className="mr-2 form-checkbox text-mm-success focus:outline-none focus:ring-2 focus:ring-mm-primary"
          />
          <span className="flex items-center">
            {item.text}
            {!item.conditionMet && (
              <span className="ml-1 text-xs text-mm-error">!</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChecklistCard;