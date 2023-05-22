import React, { useEffect, useState } from "react";

import isIBAN from "validator/lib/isIBAN";
import * as z from "zod";
import useAccountStore, {
  IBankAccountData,
} from "../../../../../context/BankAccountsStore";

interface FormErrors {
  name?: string;
  iban?: string | undefined;
  reference?: string;
  type?: string;
}

const bankAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  iban: z.string().optional().refine((val) => !val || isIBAN(val), { message: "bitte gib eine gültigen IBAN ein" }),
  reference: z.enum(["name", "iban"]),
  type: z.enum(["giro", "invest"]),
});

interface IProps {
  account?: IBankAccountData | null;
  onClose: () => void;
}
function HandleExistingBankAccounts({ account, onClose }: IProps) {
  const { addBankAccount, updateBankAccount } = useAccountStore();
  const [name, setName] = useState("");
  const [iban, setIban] = useState<string | undefined>(undefined);
  const [reference, setReference] = useState<"name" | "iban">("name");
  const [type, setType] = useState<"giro" | "invest">("giro");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (account) {
      setName(account.name);
      setIban(account.iban || "");
      setReference(account.reference);
      setType(account.type);
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
    } else if (name === "type") {
      setType(value as "giro" | "invest");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const ibanValue = iban ? iban : undefined;
      bankAccountSchema.parse({
        name,
        iban: ibanValue,
        reference,
        type,
      });
      const newAccount: IBankAccountData = {
        name,
        iban: ibanValue,
        reference,
        type,
        _id: account?._id ?? "",
      };
      if (account) {
        await updateBankAccount({ _id: account._id, data: newAccount });
      } else {
        await addBankAccount(newAccount);
      }
      onClose();
    } catch (error: any) {
      console.error("Failed to save account", error);
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
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
          Art des Kontos
        </label>
        <select
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="type"
          name="type"
          value={type}
          onChange={handleChange}
        >
          <option value="giro">Girokonto</option>
          <option value="invest">InvestmentKonto</option>
        </select>
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
          className="m-2 mx-2 rounded bg-white px-4 py-2 text-gray-700 hover:bg-opacity-75 border-2 border-mm-foreground"
          type="button"
          onClick={onClose}
        >
          Abbrechen
        </button>
        <button
          className="m-2 mx-2 rounded bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75 border-2 border-mm-foreground"
          type="submit"
        >
          {account ? "Speichern" : "Hinzufügen"}
        </button>
      </div>
    </form>
  );
}
export default HandleExistingBankAccounts;
