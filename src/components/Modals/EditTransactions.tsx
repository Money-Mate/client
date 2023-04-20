import React, { useState } from "react";
interface ModalProps {
  title: string;
  onSave: (data: any) => void;
  onCancel: () => void;
  data: any;
  fetchTransactions: () => void;
  onDelete: () => void;
  transformedCategories: any[];
}

const Modal: React.FC<ModalProps> = ({
  title,
  onSave,
  onCancel,
  data,
  transformedCategories,
  onDelete,
}) => {
  const [formData, setFormData] = useState<any>({});

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };
  const handleDelete = () => {
    onDelete();
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onCancel}
        ></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-4 py-5 sm:px-6">
            <h2
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              {title}
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label
                  htmlFor="accountIBAN"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Konto
                </label>
                <input
                  type="text"
                  id="accountIBAN"
                  name="accountIBAN"
                  value={formData.accountIBAN || data.accountIBAN}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Datum
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date || data.date}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Summe
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount || data.amount}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="currency"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Währung
                </label>
                <input
                  type="text"
                  id="currency"
                  name="currency"
                  value={formData.currency || data.currency}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="recipientName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Empfänger
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName || data.recipientName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="transactionText"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Verwendungszweck
                </label>
                <textarea
                  id="transactionText"
                  name="transactionText"
                  value={formData.transactionText || data.transactionText}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Kategorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category || data.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {transformedCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subCategory"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Unterkategorie
                </label>
                <input
                  type="text"
                  id="subCategory"
                  name="subCategory"
                  value={formData.subCategory || data.subCategory}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* TAGS ?? */}
              {/* <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={
                    formData.tags
                      ? formData.tags.join(", ")
                      : data.tags.join(", ")
                  }
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div> */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                >
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Transaktion löschen
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
