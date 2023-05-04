import { useCallback, useEffect, useState } from "react";
import { OptionsData } from "../../transactionsGiro/TransactionsGiro";

interface FilterTransactionsModalProps {
  onClose: () => void;
  filteredOptions: OptionsData;
  setOptions: (options: OptionsData) => void;
  options: OptionsData;
}

const FilterTransactionsModal = ({
  onClose,
  filteredOptions,
  setOptions,
  options,
}: FilterTransactionsModalProps) => {
  const [accountIBANs, setAccountIBANs] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const handleAccountIBANChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAccountIBANs((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    },
    []
  );

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    },
    []
  );

  const handleSubCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSubCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    },
    []
  );

  useEffect(() => {
    setOptions({
      ...options,
      accounts: accountIBANs,
      categories: categories,
      subCategories: subCategories,
    });
  }, [accountIBANs, categories, subCategories]);

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const updatedOptions = { ...options, [name]: value };
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
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
              Filteroptionen:
            </h3>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Konten
              </label>
              {filteredOptions.accounts?.map((account) => (
                <div key={account} className="flex items-center">
                  <input
                    type="checkbox"
                    name="accountIBAN"
                    value={account}
                    onChange={handleAccountIBANChange}
                    checked={accountIBANs.includes(account)}
                    className="mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{account}</span>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Kategorien
              </label>
              {filteredOptions.categories?.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    checked={categories.includes(category)}
                    className="mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{category}</span>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Unterkategorien
              </label>
              {filteredOptions.subCategories?.map((subCategory) => (
                <div key={subCategory} className="flex items-center">
                  <input
                    type="checkbox"
                    name="subCategory"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    checked={subCategories.includes(subCategory)}
                    className="mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{subCategory}</span>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Zeitraum
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
                Reihenfolge
              </label>
              <select
                name="date"
                value={options.date}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="asc">Neueste zuerst</option>

                <option value="desc">Älteste zuerst </option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Einnahmen/Ausgaben
              </label>
              <select
                name="amount"
                value={options.amount}
                onChange={handleOptionChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Alle</option>
                <option value="pos">Einnahmen</option>
                <option value="neg">Ausgaben</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={handleSubmit}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Filter anwenden
            </button>
            <button
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTransactionsModal;
