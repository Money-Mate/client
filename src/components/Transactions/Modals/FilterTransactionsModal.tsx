import { useState } from "react";
import { OptionsData } from "../../../pages/TransactionsGiro";

interface FilterTransactionsModalProps {
  onClose: () => void;
  filteredOptions: OptionsData;

  setOptions: Function,
  options: OptionsData;
}

const FilterTransactionsModal = ({
  onClose,
  filteredOptions,
  options,
  setOptions

}: FilterTransactionsModalProps) => {

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleSubmit = () => {
    setOptions(options);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
              Filter Options
            </h3>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Account
              </label>
              <select
                name="accountIBAN"
                value={options.accountIBAN}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                {filteredOptions.accounts?.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={options.category}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                {filteredOptions.categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <select
                name="subCategory"
                value={options.subCategory}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                {filteredOptions.subCategories?.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="flex">
                <input
                  type="date"
                  name="startDate"
                  value={options.dateRange?.startDate}
                  onChange={handleOptionChange}
                  className="mr-1 w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  name="endDate"
                  value={options.dateRange?.endDate}
                  onChange={handleOptionChange}
                  className="ml-1 w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date Order
              </label>
              <select
                name="date"
                value={options.date}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Amount Sign
              </label>
              <select
                name="amount"
                value={options.amount}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">None</option>
                <option value="pos">Positive</option>
                <option value="neg">Negative</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={handleSubmit}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Apply Filters
            </button>
            <button
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTransactionsModal;
