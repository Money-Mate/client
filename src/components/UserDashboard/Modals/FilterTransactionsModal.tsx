import React, { useState } from 'react';

interface Props {
  onSubmit: (options: ReturnType<typeof useState>[0]) => void;
  onClose: () => void;
  fetchSubCategories: () => void;
}

const FilterTransactionsModal: React.FC<Props> = ({ onSubmit, onClose }) => {
  const backendOptions = {
    accounts: [
      'AD1400080001001234567890',
      'DE63200505501255401513'
    ],
    categories: [
      '643d1fffe08b8379159d7302',
      '643d1fffe08b8379159d737b',
      '643d1fffe08b8379159d733a',
      '644368101f0b4a348423d33e',
      '643d1fffe08b8379159d734d',
      '643d1fffe08b8379159d7371',
      '643d1fffe08b8379159d7320',
      '643d1fffe08b8379159d72f3'
    ],
    subCategories: [
      '643d1fffe08b8379159d7313',
      '643d1fffe08b8379159d7333',
      '643d1fffe08b8379159d737a',
      '643d1fffe08b8379159d735f',
      '643d1fffe08b8379159d72f6',
      '643d1fffe08b8379159d731c',
      '643d1fffe08b8379159d7383',
      '643d1fffe08b8379159d72f7',
      '643d1fffe08b8379159d7388',
      '643d1fffe08b8379159d7317',
      '643d1fffe08b8379159d72f5',
      '64436b1fe67629870c67b4e9',
      '643d1fffe08b8379159d7334',
      '643d1fffe08b8379159d735c',
      '643d1fffe08b8379159d731d',
      '643d1fffe08b8379159d7311',
      '643d1fffe08b8379159d7331',
      '643d1fffe08b8379159d7347',
      '643d1fffe08b8379159d7346',
      '643d1fffe08b8379159d7339'
    ],
    dateRange: {
      startDate: '',
      endDate: ''
    },
    amount: [
      'pos',
      'neg'
    ]
  };

  const [options, setOptions] = useState({
    accounts: [],
    categories: [],
    subCategories: [],
    dateRange: {
      startDate: '',
      endDate: ''
    },
    sortDirection: '',
    amount: []
  });

  const handleFilterChange = (key: string, value: any) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(options);
    console.log(options)
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
<div className="flex items-center justify-center min-h-screen">
  <div className="bg-white rounded-lg w-full max-w-md mx-auto p-8">
  <h1 className="block text-gray-800 font-bold mb-2">Bitte wählen Sie ihre Filteroptionen:</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
         Konten
        </label>
        {backendOptions.accounts.map((account) => (
          <div key={account}>
            <input
              type="checkbox"
              id={account}
              name={account}
              value={account}
              checked={options.accounts.includes(account)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleFilterChange(
                  'accounts',
                  isChecked
                    ? [...options.accounts, account]
                    : options.accounts.filter((a) => a !== account)
                );
              }}
            />
            <label htmlFor={account}>{account}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Kategorien
        </label>
        {backendOptions.categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              name={category}
              value={category}
              checked={options.categories.includes(category)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleFilterChange(
                  'categories',
                  isChecked
                    ? [...options.categories, category]
                    : options.categories.filter((c) => c !== category)
                );
              }}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Unterkategorien
        </label>
        {backendOptions.subCategories.map((subCategory) => (
          <div key={subCategory}>
            <input
              type="checkbox"
              id={subCategory}
              name={subCategory}
              value={subCategory}
              checked={options.subCategories.includes(subCategory)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleFilterChange(
                  'subCategories',
                  isChecked
                    ? [...options.subCategories, subCategory]
                    : options.subCategories.filter(
                        (sc) => sc !== subCategory
                      )
                );
              }}
            />
            <label htmlFor={subCategory}>{subCategory}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Einnahmen- Ausgaben
        </label>
        <div>
          <input
            type="checkbox"
            id="pos"
            name="pos"
            value="pos"
            checked={options.amount.includes('pos')}
            onChange={(e) => {
              const isChecked = e.target.checked;
              handleFilterChange(
                'amount',
                isChecked
                  ? [...options.amount, 'pos']
                  : options.amount.filter((a) => a !== 'pos')
              );
            }}
          />
          <label htmlFor="pos">Nur Einnahmen</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="neg"
            name="neg"
            value="neg"
            checked={options.amount.includes('neg')}
            onChange={(e) => {
              const isChecked = e.target.checked;
              handleFilterChange(
                'amount',
                isChecked
                  ? [...options.amount, 'neg']
                  : options.amount.filter((a) => a !== 'neg')
              );
            }}
          />
          </div>
          <label htmlFor="neg">Nur Ausgaben</label>
        </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Sortieren nach:
        </label>
        <div>
          <input
            type="radio"
            id="sort-descending"
            name="sort-direction"
            value="desc"
            checked={options.sortDirection === 'desc'}
            onChange={(e) =>
              handleFilterChange('sortDirection', e.target.value)
            }
          />
          <label htmlFor="sort-descending">Absteigend</label>
        </div>
        <div>
          <input
            type="radio"
            id="sort-ascending"
            name="sort-direction"
            value="asc"
            checked={options.sortDirection === 'asc'}
            onChange={(e) =>
              handleFilterChange('sortDirection', e.target.value)
            }
          />
          <label htmlFor="sort-ascending">Zeitraum auswählen</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Von
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          className="form-input block w-full mt-1"
          value={options.dateRange.startDate}
          onChange={(e) =>
            handleFilterChange('dateRange', {
              ...options.dateRange,
              startDate: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Bis
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          className="form-input block w-full mt-1"
          value={options.dateRange.endDate}
          onChange={(e) =>
            handleFilterChange('dateRange', {
              ...options.dateRange,
              endDate: e.target.value,
            })
          }
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Anwenden
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>{onClose()}}
      >
        Abbrechen
      </button>
    </form>

    </div>

</div>
</div>


);
};

export default FilterTransactionsModal;