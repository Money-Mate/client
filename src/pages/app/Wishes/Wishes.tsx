import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { formatNumber } from "../../../utils/formatterFunctions";

interface IWish {
  _id: string;
  name: string;
  price: number;
}

const BE_URL = import.meta.env.VITE_BE_PORT;

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

  useEffect(() => {
    (async () => {
      setWishes(await fetchWishes());
      setLoading(false);
    })();
  }, []);

  const newHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      price: Number(e.target[1].value),
    };
    try {
      axios
        .post(`${BE_URL}/wish/add`, data, {
          withCredentials: true,
        })
        .then(async () => {
          setWishes(await fetchWishes());
          e.target[0].value = "";
          e.target[1].value = "";
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
        name:
          e.target[0].value === ""
            ? e.target[0].placeholder
            : e.target[0].value,
        price:
          e.target[1].value === ""
            ? Number(e.target[1].placeholder)
            : Number(e.target[1].value),
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
    <div className="p-6 text-white">
      <section>
        <form
          onSubmit={(e) => newHandler(e)}
          className="flex items-center gap-4"
        >
          <div>
            <label htmlFor="name">Name des Wunsches:</label>
            <input type="text" id="name" className="ml-2 text-black"></input>
          </div>
          <div>
            <label htmlFor="price">Preis des Wunsches:</label>
            <input type="number" id="price" className="ml-2 text-black"></input>
          </div>
          <button className="m-4 bg-green-400 p-2">
            Neuen Wunsch erstellen
          </button>
        </form>
      </section>
      <section>
        {loading ?? <div>loading...</div>}
        <ul>
          {wishes.map((wish) => {
            if (wish._id === edit) {
              return (
                <li key={wish._id} className="my-4 flex bg-slate-800 p-4">
                  <form
                    className="flex h-full w-full"
                    onSubmit={(e) => editHandler(e, wish._id)}
                  >
                    <div className="min-w-[25%]">
                      <input
                        type="text"
                        placeholder={wish.name}
                        className="h-full w-[90%] p-1 text-black"
                      ></input>
                    </div>
                    <div className="min-w-[25%]">
                      <input
                        type="number"
                        placeholder={wish.price.toString()}
                        className="h-full w-[90%] p-1 text-black"
                      ></input>
                    </div>
                    <div className="ml-auto">
                      <button type="submit" className="mx-1 bg-green-400 p-1">
                        speichern
                      </button>
                      <button
                        type="button"
                        className="mx-1 bg-red-300 p-1"
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
              <li key={wish._id} className="my-4 flex bg-slate-800 p-4">
                <div className="min-w-[25%]">{wish.name}</div>
                <div className="min-w-[25%]">{formatNumber(wish.price)}</div>
                <div className="ml-auto">
                  <button
                    onClick={() => setEdit(wish._id)}
                    className="mx-1 bg-yellow-400 p-1"
                  >
                    bearbeiten
                  </button>
                  <button
                    onClick={() => deleteHandler(wish._id)}
                    className="mx-1 bg-red-400 p-1"
                  >
                    löschen
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Wishes;
