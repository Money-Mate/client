import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSymbol from "../../../components/LoadingSymbol";
import { formatNumber } from "../../../utils/formatterFunctions";

interface IWish {
  _id: string;
  name: string;
  price: number;
}

const BE_URL = import.meta.env.VITE_BE_PORT;
const defaultNewFormData = { name: "", price: "" };
const defaultEditFormData = { name: "", price: "" };

const fetchWishes = async (): Promise<IWish[]> => {
  try {
    const wishes = await axios.get<IWish[]>(`${BE_URL}/wish/getAllMy`, {
      withCredentials: true,
    });
    return wishes.data;
  } catch (err) {
    console.log("Failed to fetch wish data", err);
    throw new Error();
  }
};

function Wishes() {
  const [wishes, setWishes] = useState<IWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState("");
  const [newFormData, setNewFormData] = useState(defaultNewFormData);
  const [editFormData, setEditFormData] = useState(defaultEditFormData);

  useEffect(() => {
    (async () => {
      setWishes(await fetchWishes());
      setLoading(false);
    })();
  }, []);

  const onNewFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const newHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: newFormData.name,
      price: Number(newFormData.price),
    };
    try {
      axios
        .post(`${BE_URL}/wish/add`, data, {
          withCredentials: true,
        })
        .then(async () => {
          setWishes(await fetchWishes());
          setNewFormData(defaultNewFormData);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const data = {
      wishId: id,
      data: {
        ...(editFormData.name !== "" && { name: editFormData.name }),
        ...(editFormData.price !== "" && { price: Number(editFormData.price) }),
      },
    };
    try {
      axios
        .put(`${BE_URL}/wish/updateMy`, data, { withCredentials: true })
        .then(async () => {
          setEdit("");
          setWishes(await fetchWishes());
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (id: string) => {
    try {
      axios
        .delete(`${BE_URL}/wish/deleteMy/${id}`, {
          withCredentials: true,
        })
        .then(async () => setWishes(await fetchWishes()));
    } catch (err) {
      console.log("failed to delete wish", err);
    }
  };

  return (
    <div className="w-full p-6 text-mm-text-dark ">
      <section className="my-2 mb-8 rounded bg-mm-foreground px-2">
        <form onSubmit={newHandler} className="flex items-center gap-4">
          <div>
            <label htmlFor="name">Name des Wunsches:</label>
            <input
              type="text"
              id="name"
              value={newFormData.name}
              onChange={onNewFormChange}
              className="ml-2 rounded bg-white p-1 text-black"
            ></input>
          </div>
          <div>
            <label htmlFor="price">Preis des Wunsches:</label>
            <input
              type="number"
              id="price"
              value={newFormData.price}
              onChange={onNewFormChange}
              className="ml-2 rounded bg-white p-1 text-black"
            ></input>
          </div>
          <button className="m-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75">
            Neuen Wunsch erstellen
          </button>
        </form>
      </section>
      <section>
        {loading ? (
          <LoadingSymbol />
        ) : (
          <ul>
            {wishes.map((wish) => {
              if (wish._id === edit) {
                return (
                  <li
                    key={wish._id}
                    className="my-4 flex items-center rounded border-2 border-white bg-mm-foreground p-4"
                  >
                    <form
                      className="flex h-full w-full"
                      onSubmit={(e) => editHandler(e, wish._id)}
                    >
                      <div className="min-w-[25%]">
                        <input
                          id="name"
                          type="text"
                          placeholder={wish.name}
                          value={editFormData.name}
                          onChange={onEditFormChange}
                          className="h-full w-[90%] rounded bg-white p-1 text-black"
                        ></input>
                      </div>
                      <div className="min-w-[25%]">
                        <input
                          id="price"
                          type="number"
                          placeholder={wish.price.toString()}
                          value={editFormData.price}
                          onChange={onEditFormChange}
                          className="h-full w-[90%] rounded bg-white p-1 text-black"
                        ></input>
                      </div>
                      <div className="ml-auto">
                        <button
                          type="submit"
                          className="mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                        >
                          speichern
                        </button>
                        <button
                          type="button"
                          className="mx-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                          onClick={() => setEdit("")}
                        >
                          abbrechen
                        </button>
                      </div>
                    </form>
                  </li>
                );
              }
              return (
                <li
                  key={wish._id}
                  className="my-4 flex items-center rounded bg-mm-foreground p-4"
                >
                  <div className="text-gradient pt-3xt-lg m-2 min-w-[25%] bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-left text-xl font-bold leading-tight text-transparent">
                    {wish.name}
                  </div>
                  <div className="min-w-[25%] text-white">
                    {formatNumber(wish.price)}
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => setEdit(wish._id)}
                      className="mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      bearbeiten
                    </button>
                    <button
                      onClick={() => deleteHandler(wish._id)}
                      className="mx-2 rounded-lg bg-red-500 px-4 py-2 text-mm-text-white hover:bg-opacity-75"
                    >
                      löschen
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Wishes;
