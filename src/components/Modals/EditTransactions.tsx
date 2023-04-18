import React, { useRef } from "react";

interface ModalProps {
  title: string;
  onSave: (data: any) => void;
  onCancel: () => void;
  data: any;
  categories: string[];
}

const Modal: React.FC<ModalProps> = ({ title, onSave, onCancel, data, categories }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    const formElements = modalRef.current?.querySelectorAll("form > *");
    if (!formElements) {
      return;
    }
    const formData: { [key: string]: any } = {};
    formElements.forEach((el) => {
      if (el.nodeName === "INPUT" || el.nodeName === "SELECT" || el.nodeName === "TEXTAREA") {
        formData[el.getAttribute("name") as string] = el.value;
      }
    });

    onSave(formData);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onCancel}></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" ref={modalRef}>
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{title}</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form>
              <div className="mb-4">
                <label htmlFor="accountIBAN" className="block text-gray-700 font-bold mb-2">Konto</label>
                <input type="text" id="accountIBAN" name="accountIBAN" defaultValue={data.accountIBAN} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Summe</label>
                <input type="number" id="amount" name="amount" defaultValue={data.amount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="currency" className="block text-gray-700 font-bold mb-2">Währung</label>
                <input type="text" id="currency" name="currency" defaultValue={data.currency} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="recipientName" className="block text-gray-700 font-bold mb-2">Empfänger</label>
                <input type="text" id="recipientName" name="recipientName" defaultValue={data.recipientName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="transactionText" className="block text-gray-700 font-bold mb-2">Verwendungszweck</label>
                <textarea id="transactionText" name="transactionText" defaultValue={data.transactionText} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              {/* <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Datum</label>
                <input type="date" id="date" name="date" defaultValue={data.date} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div> */}
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Kategorie</label>
                <select id="category" name="category" defaultValue={data.category} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="subCategory" className="block text-gray-700 font-bold mb-2">Unterkategorie</label>
                <input type="text" id="subCategory" name="subCategory" defaultValue={data.subCategory} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags</label>
                <input type="text" id="tags" name="tags" defaultValue={data.tags.join(", ")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </form>
            <div className="mt-4">
              <button onClick={handleSave} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm">
                Speichern
              </button>
              <button onClick={onCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Modal;
