import axios from "axios";
import React, { useState } from "react";
import isIBAN from "validator/lib/isIBAN";
import * as z from "zod";

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
  accountIBAN: z.string().refine(isIBAN, { message: "not a valid IBAN" }),
  date: z
    .string({
      required_error: "Bitte ein Datum eingeben!",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Das Datum muss im Format yyyy-MM-dd sein!",
    }),

  amount: z.number({
    required_error: "Bitte eine Summe eingeben",
    invalid_type_error: "Der Wert muss eine Zahl sein",
  }),
  currency: z.string({
    required_error: "Bitte eine Währung eingeben!",
  }),
  recipientName: z.string().optional(),
  transactionText: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
});

export const formDataSchemaEditing = z.object({
  accountIBAN: z
    .string()
    .refine(isIBAN, { message: "not a valid IBAN" })
    .optional(),
  date: z.string().optional(),
  amount: z
    .number()
    .refine((value) => !isNaN(value), {
      message: "Der Wert muss eine Zahl sein",
    })
    .optional(),
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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [formErrors, setFormErrors] = useState<any>({});

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(isAddingTransaction);
    try {
      const validatedData = isAddingTransaction
        ? formDataSchema.parse(formData)
        : formDataSchemaEditing.parse(formData);
      console.log(validatedData);
      setFormErrors({});
      onSave(validatedData);
    } catch (error: any) {
      console.log(error.formErrors);
      setFormErrors(error.formErrors?.fieldErrors);
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
        <div className="transform overflow-hidden rounded-lg bg-mm-foreground shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              className="mt-2 text-lg font-medium leading-6 text-white"
              id="modal-title"
            >
              Transaktion {title}:
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label
                  htmlFor="accountIBAN"
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
                  className="mb-2 block font-bold text-mm-text-dark"
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
              {/* buttons for editing/ adding transaction */}
              <div className="mt-4">
                {isAddingTransaction ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="m-2 mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      Hinzufügen
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="m-2 mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      Änderungen speichern
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="m-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      Transaktion löschen
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
