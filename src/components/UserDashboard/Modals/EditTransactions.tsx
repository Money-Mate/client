import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";

//  TAGS
// DYNAMIC SUBCATEGORIES
interface ModalProps {
  title: string;
  onSave: (data: any) => void;
  onCancel: () => void;
  data: any;
  fetchTransactions: () => void;
  onDelete: () => void;
  transformedCategories: any[];
  isAddingTransaction: boolean;
}

interface SubCategory {
  id: string;
  name: string;
}

//add vs save object
//Validation Schmea for Zod
export const formDataSchema = z.object({
  accountIBAN: z
    .string()
    .min(3, { message: "Die IBAN muss mindestens 3 Zeichen lang sein!" })
    .nonempty(" IBAN ist erforderlich!"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Das Datum muss im Format yyyy-MM-dd sein!",
    })
    .nonempty(" Datum ist erforderlich!"),
  amount: z.number({
    required_error: "Der Wert ist erforderlich",
    invalid_type_error: "Der Wert muss eine Zahl sein",
  }),
  currency: z.string().nonempty("Währung ist erforderlich!"),
  recipientName: z.string().optional(),
  transactionText: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
});

// validation for editing
export const formDataSchemaEditing = z.object({
  accountIBAN: z
    .string()
    .min(3, { message: "Die IBAN muss mindestens 3 Zeichen lang sein!" })
    .optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Das Datum muss im Format yyyy-MM-dd sein!",
    })
    .optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  recipientName: z.string().optional(),
  transactionText: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
});

const TransactionModal: React.FC<ModalProps> = ({
  title,
  onSave,
  onCancel,
  data,
  onDelete,
  transformedCategories,
  isAddingTransaction,
}) => {
  const [formData, setFormData] = useState<any>({});
  // const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  // const [transformedSubCategories, setTransformedSubCategories] = useState([]);
  const [formErrors, setFormErrors] = useState<any>({});

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validatedData = isAddingTransaction
        ? formDataSchema.parse(formData)
        : formDataSchemaEditing.parse(formData);
      setFormErrors({});
      onSave(validatedData);
    } catch (error: any) {
      setFormErrors(error.formErrors.fieldErrors);
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  const handleDelete = () => {
    onDelete();
  };

  const fetchSubCategories = async (categoryId: string) => {
    const BE_URL = import.meta.env.VITE_BE_PORT;
    try {
      const response = await axios.get(
        `${BE_URL}/subcategory/getSubByCategory/${categoryId}`,
        { withCredentials: true }
      );
      const transformedSubCategories = response.data.map(
        (subCategory: any) => ({
          id: subCategory._id,
          name: subCategory.name,
        })
      );
      setSubCategories(transformedSubCategories);
      console.log(subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "category") {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
        subCategory: "",
      }));
      fetchSubCategories(value);
    } else if (name === "date") {
      const formattedDate = new Date(value).toISOString().slice(0, 10);
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    } else if (name === "amount") {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="edit/add-transactions"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onCancel}
        ></div>
        <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
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
                  className="mb-2 block font-bold text-gray-700"
                >
                  Konto
                </label>
                <input
                  type="text"
                  id="accountIBAN"
                  name="accountIBAN"
                  value={
                    isAddingTransaction
                      ? formData.accountIBAN || ""
                      : formData.accountIBAN || data.accountIBAN
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                {formErrors.accountIBAN && (
                  <span className="text-sm text-red-500">
                    {formErrors.accountIBAN}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Datum
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={
                    isAddingTransaction
                      ? formData.date || ""
                      : formData.date || data.date
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                {formErrors.date && (
                  <span className="text-sm text-red-500">
                    {formErrors.date}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Summe
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={
                    isAddingTransaction
                      ? formData.amount || ""
                      : formData.amount || data.amount
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                {formErrors.amount && (
                  <span className="text-sm text-red-500">
                    {formErrors.amount}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="currency"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Währung
                </label>
                <input
                  type="text"
                  id="currency"
                  name="currency"
                  value={
                    isAddingTransaction
                      ? formData.currency || ""
                      : formData.currency || data.currency
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                {formErrors.currency && (
                  <span className="text-sm text-red-500">
                    {formErrors.currency}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="recipientName"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Empfänger
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={
                    isAddingTransaction
                      ? formData.recipientName || ""
                      : formData.recipientName || data.recipientName
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                {formErrors.recipientName && (
                  <span className="text-sm text-red-500">
                    {formErrors.recipientName}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="transactionText"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Verwendungszweck
                </label>
                <textarea
                  id="transactionText"
                  name="transactionText"
                  value={
                    isAddingTransaction
                      ? formData.transactionText || ""
                      : formData.transactionText || data.transactionText
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                ></textarea>
                {formErrors.transactionText && (
                  <span className="text-sm text-red-500">
                    {formErrors.transactionText}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Kategorie
                </label>
                <select
                  id="category"
                  name="category"
                  value={
                    isAddingTransaction
                      ? formData.category || ""
                      : formData.category || data.category
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                >
                  <option value="">-- Kategorie wählen --</option>
                  {transformedCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <span className="text-sm text-red-500">
                    {formErrors.category}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subCategory"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Unterkategorie
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={
                    isAddingTransaction
                      ? formData.subCategory || ""
                      : formData.subCategory || data.subCategory
                  }
                  onChange={handleInputChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                >
                  <option value="">-- Unterkategorie wählen --</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                >
                  {isAddingTransaction ? "Hinzufügen" : "Änderungen speichern"}
                </button>
                {isAddingTransaction ? null : (
                  <>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Transaktion löschen
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Abbrechen
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
