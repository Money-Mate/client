import React, { useState, useEffect } from "react";

import useAccountStore, { IBankAccountData } from "../../../../../context/Accountstore";
import * as z from "zod";
import isIBAN from "validator/lib/isIBAN";

interface FormErrors {
  name?: string;
  iban?: string;
  reference?: string;
}

const bankAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  iban: z.string().refine(isIBAN, { message: "not a valid IBAN" }).optional(),
  reference: z.enum(["name", "iban"]),
});


interface IProps {
  account?: IBankAccountData | null;
  onClose: () => void;
}
function HandleExistingBankAccounts({ account, onClose }: IProps) {
  const { addBankAccount, updateBankAccount } = useAccountStore();
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [reference, setReference] = useState<"name" | "iban">("name");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (account) {
      setName(account.name);
      setIban(account.iban);
      setReference(account.reference);
    }
  }, [account]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "iban") {
      setIban(value);
    } else if (name === "reference") {
      setReference(value as "name" | "iban");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      bankAccountSchema.parse({
        name,
        iban,
        reference,
      });
      const newAccount: IBankAccountData = {
        name,
        iban,
        reference,
        _id: account?._id ?? "",
      };
      console.log("account", account);
      console.log("newAccount", newAccount);
      if (account) {
        await updateBankAccount({ _id: account._id, data: newAccount });
      } else {
        await addBankAccount(newAccount);
      }
      onClose();
    } catch (error: any) {
      console.log("error", error);
      console.error("Failed to save account", error);
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
        console.log(errors);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-700" htmlFor="name">
          Name
        </label>
        {errors && <div className="text-red-500">{errors.name}</div>}
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-700" htmlFor="iban">
          IBAN
        </label>
        {errors && <div className="text-red-500">{errors.iban}</div>}
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="iban"
          type="text"
          name="iban"
          value={iban}
          onChange={handleChange}
          placeholder="IBAN"
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block font-bold text-gray-700"
          htmlFor="reference"
        >
          Reference
        </label>
        <select
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="reference"
          name="reference"
          value={reference}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="iban">IBAN</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
          type="button"
          onClick={onClose}
        >
          Abbrechen
        </button>
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          {account ? "Speichern" : "Hinzufügen"}
        </button>
      </div>
    </form>
  );
}
export default HandleExistingBankAccounts;
