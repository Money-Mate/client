import React, { useState } from "react";
import { useUserStore, User } from '../../../../context/UserStore';


const FinancialOptionsSettings: React.FC = () => {
  const { user, updateUser } = useUserStore();
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      financialOptions: {
        ...prevState.financialOptions,
        [name]: checked,
      },
    }));
  };

  const handleInputFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string,
    key: string
  ) => {
    const { value } = event.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      financialOptions: {
        ...prevState.financialOptions,
        [category]: {
          ...prevState.financialOptions[category],
          [key]: value,
        },
      },
    }));
  };

  const handleSaveChanges = () => {
    updateUser(updatedUser);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Financial Options Settings</h2>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="trackHabits"
          name="trackHabits"
          checked={updatedUser.financialOptions.trackHabits}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="trackHabits" className="font-medium">
          Track Habits
        </label>
      </div>

      <div className="ml-4">
        <h3 className="mb-2 text-lg font-bold">Track Habits Settings</h3>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isTracked"
            name="isTracked"
            checked={
              updatedUser.financialOptions.trackHabitsSettings.budgets.isTracked
            }
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isTracked" className="font-medium">
            Track Budgets
          </label>
        </div>

        {updatedUser.financialOptions.trackHabitsSettings.budgets.isTracked && (
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-bold">Budget Items</h4>
            {Object.entries(
              updatedUser.financialOptions.trackHabitsSettings.budgets
                .budgetItems
            ).map(([key, budgetItem]) => (
              <div key={key} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={budgetItem.now}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `budgetItems.${key}.now`
                    )
                  }
                  className="mr-2 w-16 p-2"
                />
                <span className="mr-2">of</span>
                <input
                  type="text"
                  value={budgetItem.of}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `budgetItems.${key}.of`
                    )
                  }
                  className="mr-2 w-16 p-2"
                />
                <span className="mr-2">%</span>
                <input
                  type="text"
                  value={budgetItem.percent}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `budgetItems.${key}.percent`
                    )
                  }
                  className="mr-2 w-16 p-2"
                />
                <span className="mr-2">{key}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <input
            type="checkbox"
            id="isTrackedEmergencyFund"
            name="isTrackedEmergencyFund"
            checked={
              updatedUser.financialOptions.trackHabitsSettings.emergencyFund
                .isTracked
            }
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isTrackedEmergencyFund" className="font-medium">
            Track Emergency Fund
          </label>
        </div>

        {updatedUser.financialOptions.trackHabitsSettings.emergencyFund
          .isTracked && (
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-bold">Emergency Fund</h4>
            <div className="mb-2 flex items-center">
              <input
                type="text"
                value={
                  updatedUser.financialOptions.trackHabitsSettings.emergencyFund
                    .amountEmergencyFund
                }
                onChange={(event) =>
                  handleInputFieldChange(
                    event,
                    "trackHabitsSettings",
                    "emergencyFund.amountEmergencyFund"
                  )
                }
                className="mr-2 w-16 p-2"
              />
              <span className="mr-2">Amount</span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <input
            type="checkbox"
            id="isTrackedGoalsWishlist"
            name="isTrackedGoalsWishlist"
            checked={
              updatedUser.financialOptions.trackHabitsSettings.goalsWishlist
                .isTracked
            }
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="isTrackedGoalsWishlist" className="font-medium">
            Track Goals Wishlist
          </label>
        </div>

        {updatedUser.financialOptions.trackHabitsSettings.goalsWishlist
          .isTracked && (
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-bold">Wishlist Items</h4>
            {Object.entries(
              updatedUser.financialOptions.trackHabitsSettings.goalsWishlist
                .wishlistItems
            ).map(([key, wishlistItem]) => (
              <div key={key} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={wishlistItem.now}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `wishlistItems.${key}.now`
                    )
                  }
                  className="mr-2 w-16 p-2"
                />
                <span className="mr-2">of</span>
                <input
                  type="text"
                  value={wishlistItem.of}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `wishlistItems.${key}.of`
                    )
                  }
                  className="mr-2 w-16 p-2"
                />
                <span className="mr-2">%</span>
                <input
                  type="checkbox"
                  id={`fulfilled-${key}`}
                  name={`fulfilled-${key}`}
                  checked={wishlistItem.fulfilled}
                  onChange={(event) =>
                    handleInputFieldChange(
                      event,
                      "trackHabitsSettings",
                      `wishlistItems.${key}.fulfilled`
                    )
                  }
                  className="mr-2"
                />
                <label htmlFor={`fulfilled-${key}`} className="font-medium">
                  Fulfilled
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSaveChanges}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default FinancialOptionsSettings;
