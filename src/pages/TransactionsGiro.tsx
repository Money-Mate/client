import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modals/EditTransactions";

interface TransactionData {
  _id: string;
  accountIBAN: string;
  date: string;
  transactionText: string;
  recipientName: string;
  recipientIBAN: string;
  amount: number;
  currency: string;
  category: string;
  subCategory: string;
  tags: string[];
}
const BE_URL = import.meta.env.VITE_BE_PORT;

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [tableDataState, setTableDataState] = useState<TransactionData[]>([]);
  const [editingTransactionId, setEditingTransactionId] = useState("");

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BE_URL}/transaction/getMy`, {
        withCredentials: true,
      });
      console.log(response.data);
      setTableDataState(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleRowAction = async (index: number, rowData?: TransactionData) => {
    if (rowData) {
      try {
        const response = await axios.put(
          `${BE_URL}/transaction/updateMy`,
          { transactionId: editingTransactionId, data: rowData },
          { withCredentials: true }
        );
        if (response.status === 200) {
          // Call fetchTransactions to update the data in the table
          await fetchTransactions();
          setIsModalOpen(false);
        } else {
          console.log(`Server returned status code ${response.status}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsModalOpen(false);
      setEditingRowIndex(-1);
    }
  };
  const onDelete = async () => {
    try {
      const BE_URL = import.meta.env.VITE_BE_PORT;
      const response = await axios.delete(`${BE_URL}/transaction/deleteMy/${editingTransactionId}`, {
        withCredentials: true,
      });
      fetchTransactions();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Get unique categories from the data
  const categories = Array.from(
    new Set(tableDataState.map((row) => row.category))
  );

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left font-bold">Konto</th>
            <th className="py-3 px-6 text-left font-bold">Summe</th>
            <th className="py-3 px-6 text-left font-bold">Währung</th>
            <th className="py-3 px-6 text-left font-bold">Empfänger</th>
            <th className="py-3 px-6 text-left font-bold">Verwendungszweck</th>
            <th className="py-3 px-6 text-left font-bold">Datum</th>
            <th className="py-3 px-6 text-left font-bold"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tableDataState.map((row, index) => (
            <tr key={row._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.accountIBAN}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.amount ? row.amount.toFixed(2) : ""} {row.currency}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.currency}
              </td>
              <td className="py-3 px-6 text-left">{row.recipientName}</td>
              <td className="py-3 px-6 text-left">{row.transactionText}</td>
              <td className="py-3 px-6 text-left"> {row.date}</td>
              <td>
                <button
                  className="text-red-400"
                  onClick={() => {
                    setEditingTransactionId(row._id);
                    setEditingRowIndex(index);
                    setIsModalOpen(true);
                  }}
                >
                  Bearbeiten
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && editingRowIndex >= 0 && (
        <Modal
          key={editingRowIndex}
          title="Bearbeiten"
          onSave={(rowData) => handleRowAction(editingRowIndex, rowData)}
          onCancel={() => setIsModalOpen(false)}
          data={tableDataState[editingRowIndex]}
          categories={categories}
          fetchTransactions={fetchTransactions}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
export default Transactions;
