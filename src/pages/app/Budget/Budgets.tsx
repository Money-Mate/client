import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSymbol from "../../../components/LoadingSymbol";
import { formatNumber } from "../../../utils/formatterFunctions";

interface IBudget {
  _id: string;
  name: string;
  amount: number;
  interval: string;
  categories: { name: string; _id: string }[];
  subCategories: { name: string; _id: string }[];
  tags: { name: string; _id: string }[];
}

const BE_URL = import.meta.env.VITE_BE_PORT;
const defaultNewFormData = { name: "", amount: "" };

const fetchBudgets = async (): Promise<IBudget[]> => {
  try {
    const budgets = await axios.get<IBudget[]>(`${BE_URL}/budget/getMy`, {
      withCredentials: true,
    });
    return budgets.data;
  } catch (err) {
    console.log("Failed to fetch budget data", err);
    throw new Error();
  }
};

function Budgets() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFormData, setNewFormData] = useState(defaultNewFormData);

  useEffect(() => {
    (async () => {
      setBudgets(await fetchBudgets());
      setLoading(false);
    })();
  }, []);

  const onNewFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const newHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: newFormData.name,
      amount: Number(newFormData.amount),
    };
    try {
      axios
        .post(`${BE_URL}/budget/add`, data, {
          withCredentials: true,
        })
        .then(async () => {
          setBudgets(await fetchBudgets());
          setNewFormData(defaultNewFormData);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = () => {};

  const deleteHandler = (id: string) => {
    try {
      axios
        .delete(`${BE_URL}/budget/deleteMy/${id}`, {
          withCredentials: true,
        })
        .then(async () => setBudgets(await fetchBudgets()));
    } catch (err) {
      console.log("failed to delete budget", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <section className="my-2 mb-8 rounded bg-mm-foreground px-2">
        <form onSubmit={newHandler} className="flex items-center gap-4">
          <div>
            <label htmlFor="name">Name des Budgets:</label>
            <input
              type="text"
              id="name"
              value={newFormData.name}
              onChange={onNewFormChange}
              className="ml-2 rounded bg-mm-background p-1"
            ></input>
          </div>
          <div>
            <label htmlFor="amount">Höhe des Budgets:</label>
            <input
              type="text"
              id="amount"
              value={newFormData.amount}
              onChange={onNewFormChange}
              className="ml-2 rounded bg-mm-background p-1"
            ></input>
          </div>
          <button className="m-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75">
            Neues Budget erstellen
          </button>
        </form>
      </section>
      <section>
        {loading ? (
          <LoadingSymbol />
        ) : (
          <ul>
            {budgets.map((budget) => (
              <li
                key={budget._id}
                className="my-4 flex-col rounded bg-mm-foreground p-4"
              >
                <div className="mb-4 flex w-full items-center">
                  <h3 className="min-w-[25%] text-xl font-bold">
                    {budget.name}
                  </h3>
                  <h4 className="text-lg">{formatNumber(budget.amount)}</h4>
                  <div className="ml-auto">
                    <button className="mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75">
                      bearbeiten
                    </button>
                    <button
                      onClick={() => deleteHandler(budget._id)}
                      className="mx-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      löschen
                    </button>
                  </div>
                </div>
                <div className="flex w-full gap-4">
                  <div className="w-1/3 bg-mm-background p-2">
                    <h5 className="font-bold">Kategorien</h5>
                    <ul className="list-disc pl-8">
                      {budget.categories.map((category) => (
                        <li>{category.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/3 bg-mm-background p-2">
                    <h5 className="font-bold">UnterKategorien</h5>
                    <ul className="list-disc pl-8">
                      {budget.subCategories.map((subCategory) => (
                        <li>{subCategory.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/3 bg-mm-background p-2">
                    <h5 className="font-bold">Tags</h5>
                    <ul className="list-disc pl-8">
                      {budget.tags.map((tag) => (
                        <li>{tag.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Budgets;
