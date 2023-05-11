import React from 'react';
import { useUserStore } from '../../../../context/UserStore';

const FinancialOptionsSettings = () => {
  const { user, updateUser } = useUserStore();
console.log(user)
  const handleTrackHabitsChange = (event) => {
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabits: event.target.checked,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  const handleBudgetChange = (category, event) => {
    const { value } = event.target;
    const newBudgets = {
      ...user.financialOptions.trackHabitsSettings.budgets,
      [category]: { ...user.financialOptions.trackHabitsSettings.budgets[category], now: Number(value) },
    };
    const newTrackHabitsSettings = {
      ...user.financialOptions.trackHabitsSettings,
      budgets: newBudgets,
    };
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabitsSettings: newTrackHabitsSettings,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  const handleEmergencyFundChange = (event) => {
    const { value } = event.target;
    const newEmergencyFund = {
      ...user.financialOptions.trackHabitsSettings.emergencyFund,
      amountEmergencyFund: Number(value),
    };
    const newTrackHabitsSettings = {
      ...user.financialOptions.trackHabitsSettings,
      emergencyFund: newEmergencyFund,
    };
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabitsSettings: newTrackHabitsSettings,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  const handleWishlistItemChange = (item, event) => {
    const { value } = event.target;
    const newWishlistItems = {
      ...user.financialOptions.trackHabitsSettings.goalsWishlist.wishlistItems,
      [item]: { ...user.financialOptions.trackHabitsSettings.goalsWishlist.wishlistItems[item], now: Number(value) },
    };
    const newGoalsWishlist = {
      ...user.financialOptions.trackHabitsSettings.goalsWishlist,
      wishlistItems: newWishlistItems,
    };
    const newTrackHabitsSettings = {
      ...user.financialOptions.trackHabitsSettings,
      goalsWishlist: newGoalsWishlist,
    };
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabitsSettings: newTrackHabitsSettings,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  const handleRule305020Change = (event) => {
    const newRule305020 = {
      ...user.financialOptions.trackHabitsSettings.rule305020,
      isCustomized: event.target.checked,
    };
    const newTrackHabitsSettings = {
      ...user.financialOptions.trackHabitsSettings,
      rule305020: newRule305020,
    };
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabitsSettings: newTrackHabitsSettings,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  const handleCustomAmountChange = (type, event) => {
    const { value } = event.target;
    const newCustomAmounts = {
      ...user.financialOptions.trackHabitsSettings[type].customAmounts,
      [type]: Number(value),
    };
    const newCustomizedOption = {
      ...user.financialOptions.trackHabitsSettings[type],
      customAmounts: newCustomAmounts,
    };
    const newRule305020 = {
      ...user.financialOptions.trackHabitsSettings.rule305020,
      [type]: newCustomizedOption,
    };
    const newTrackHabitsSettings = {
      ...user.financialOptions.trackHabitsSettings,
      rule305020: newRule305020,
    };
    const newFinancialOptions = {
      ...user.financialOptions,
      trackHabitsSettings: newTrackHabitsSettings,
    };
    updateUser({
      ...user,
      financialOptions: newFinancialOptions,
    });
  };

  return (
    <div className="mb-4 w-full rounded-md bg-mm-foreground p-4 shadow-lg">
      <h2 className="mb-2 text-lg font-bold text-mm-text-whit">Financial Options Settings</h2>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="trackHabits"
          checked={user.financialOptions.trackHabits}
          onChange={handleTrackHabitsChange}
          className="mr-2"
        />
        <label htmlFor="trackHabits" className="text-white">
          Track Habits
        </label>
      </div>

      {user.financialOptions.trackHabits && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Budgets</h3>
          {Object.entries(user.financialOptions.trackHabitsSettings.budgets).map(([category, budget]) => (
            <div key={category} className="flex items-center">
              <span className="text-white mr-2">{category}:</span>
              <input
                type="number"
                value={budget.now}
                onChange={(event) => handleBudgetChange(category, event)}
                className="w-16 p-1 border border-gray-300 rounded"
              />
            </div>
          ))}

          <h3 className="text-xl font-semibold text-white">Emergency Fund</h3>
          <div className="flex items-center">
            <span className="text-white mr-2">Amount:</span>
            <input
              type="number"
              value={user.financialOptions.trackHabitsSettings.emergencyFund.amountEmergencyFund}
              onChange={handleEmergencyFundChange}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>

          <h3 className="text-xl font-semibold text-white">Goals Wishlist</h3>
          {Object.entries(user.financialOptions.trackHabitsSettings.goalsWishlist.wishlistItems).map(([item, goal]) => (
            <div key={item} className="flex items-center">
              <span className="text-white mr-2">{item}:</span>
              <input
                type="number"
                value={goal.now}
                onChange={(event) => handleWishlistItemChange(item, event)}
                className="w-16 p-1 border border-gray-300 rounded"
              />
            </div>
          ))}

          <h3 className="text-xl font-semibold text-white">Rule 30-50-20</h3>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rule305020"
              checked={user.financialOptions.trackHabitsSettings.rule305020.isCustomized}
              onChange={handleRule305020Change}
              className="mr-2"
            />
            <label htmlFor="rule305020" className="text-white">
              Customize Rule 30-50-20
            </label>
          </div>

          {user.financialOptions.trackHabitsSettings.rule305020.isCustomized && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Custom Amounts</h4>
              <div className="flex items-center">
                <span className="text-white mr-2">Needs:</span>
                <input
                  type="number"
                  value={user.financialOptions.trackHabitsSettings.rule305020.customAmounts.needs}
                  onChange={(event) => handleCustomAmountChange('needs', event)}
                  className="w-16 p-1 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center">
                <span className="text-white mr-2">Wants:</span>
                <input
                  type="number"
                  value={user.financialOptions.trackHabitsSettings.rule305020.customAmounts.wants}
                  onChange={(event) => handleCustomAmountChange('wants', event)}
                  className="w-16 p-1 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center">
                <span className="text-white mr-2">Savings:</span>
                <input
                  type="number"
                  value={user.financialOptions.trackHabitsSettings.rule305020.customAmounts.savings}
                  onChange={(event) => handleCustomAmountChange('savings', event)}
                  className="w-16 p-1 border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold text-white">Avoid Debts</h3>
          <div className="flex items-center">
            <span className="text-white mr-2">Credit:</span>
            <input
              type="number"
              value={user.financialOptions.trackHabitsSettings.avoidDebts.customAmounts.credit}
              onChange={(event) => handleCustomAmountChange('credit', event)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2">Overdraft:</span>
            <input
              type="number"
              value={user.financialOptions.trackHabitsSettings.avoidDebts.customAmounts.overdraft}
              onChange={(event) => handleCustomAmountChange('overdraft', event)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialOptionsSettings;



