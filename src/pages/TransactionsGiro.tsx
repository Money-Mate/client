import React, { useState, useEffect } from "react";
import axios from "axios";
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
const BE_URL= import.meta.env.VITE_BE_PORT

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [tableDataState, setTableDataState] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [isModalOpen]);


  const handleRowAction = async (index: number, rowData?: TransactionData) => {
    if (rowData) {
      try {
        const response = await axios.put(
  `${BE_URL}/transaction/updateMy`,
  { transactionId: rowData._id, data: rowData },
  { withCredentials: true }
);
        
        // Update the data in the table
        const newData = [...tableDataState];
        newData[index] = response.data;
        setTableDataState(newData);
      } catch (error) {
        console.log(error);
      }
    }
  
    // Close the modal
    setIsModalOpen(false);
    setEditingRowIndex(-1);
  };
  
  // Get unique categories from the data
  const categories = Array.from(new Set(tableDataState.map((row) => row.category)));

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
          <th className="py-3 px-6 text-left font-bold">Aktionen</th>
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
        title="Bearbeiten"
        onSave={(rowData) => handleRowAction(editingRowIndex, rowData)}
        onCancel={() => handleRowAction(editingRowIndex)}
        data={tableDataState[editingRowIndex]}
        categories={categories}
      />
    )}
  </div>
  );
      };
      export default Table;