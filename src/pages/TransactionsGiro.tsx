import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../components/UserDashboard/Modals/EditTransactions";

// TODO:
// TAGS -Modal
// DYNAMIC SUBCATEGORIES  - Modal
// sort by default? - Table
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

const TransactionsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [tableDataState, setTableDataState] = useState<TransactionData[]>([]);
  const [editingTransactionId, setEditingTransactionId] = useState("");
  const [transformedCategories, setTransformedCategories] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: "", direction: "" });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  // fetch data from backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BE_URL}/transaction/getMy`, {
        withCredentials: true,
      });
      setTableDataState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, []);

  // make an array of categories for the dropdown (in modal)
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BE_URL}/category/getAllMy`, {
        withCredentials: true,
      });
      const transformedCategories = response.data.map((category: any) => ({
        id: category._id,
        name: category.name,
      }));
      setTransformedCategories(transformedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTransaction = async (newTransaction: TransactionData) => {
    console.log(newTransaction);
    try {
      const response = await axios.post(
        `${BE_URL}/transaction/add`,
        newTransaction,
        { withCredentials: true }
      );
      if (response.status === 200) {
        await fetchTransactions();
        setIsModalOpen(false);
        setEditingRowIndex(-1);
      } else {
        console.log(`Server returned status code ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // editing and deleting data for specific rows
  const handleRowAction = async (index: number, rowData?: TransactionData) => {
    if (rowData) {
      try {
        const response = await axios.put(
          `${BE_URL}/transaction/updateMy`,
          { transactionId: editingTransactionId, data: rowData },
          { withCredentials: true }
        );
        if (response.status === 200) {
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
      const response = await axios.delete(
        `${BE_URL}/transaction/deleteMy/${editingTransactionId}`,
        {
          withCredentials: true,
        }
      );
      fetchTransactions();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Group transactions by date (overall setting)
  const groupedTransactions = tableDataState.reduce(
    (result: { [date: string]: TransactionData[] }, transaction) => {
      if (result[transaction.date]) {
        result[transaction.date].push(transaction);
      } else {
        result[transaction.date] = [transaction];
      }
      return result;
    },
    {}
  );

  //sorting tableData according to click
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = [...tableDataState].sort((a, b) => {
      if (a[key as keyof TransactionData] < b[key as keyof TransactionData]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key as keyof TransactionData] > b[key as keyof TransactionData]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setTableDataState(sortedData);
  };

  // render table Data
  const renderTableData = () => {
    // group by date
    return Object.entries(groupedTransactions).map(([date, transactions]) => (
      <React.Fragment key={date}>
        <tr>
          <td colSpan={7} className="font-bold py-3 px-6 text-left">
            {date.slice(0, 10)}
          </td>
        </tr>
        {/* Display TableData */}
        {transactions.map((row, index) => (
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
            <td className="py-3 px-6 text-left"> {row.date.slice(0, 10)}</td>
            <td>
              <button
                className="text-red-400"
                onClick={(e) => {
                  setEditingTransactionId(row._id);
                  const parentElement = e.currentTarget.parentElement;
                  if (parentElement && parentElement.parentElement instanceof HTMLTableRowElement) {
                    setEditingRowIndex(parentElement.parentElement.rowIndex - 2);
                  }
                  setIsAddingTransaction(false);
                  setIsModalOpen(true);
                }}
              >
                Bearbeiten
              </button>
            </td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setIsAddingTransaction(true);
          setEditingRowIndex(0);
          setIsModalOpen(true);
        }}
      >
        Add Transaction
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("accountIBAN")}
            >
              Konto{" "}
              {sortConfig.key === "accountIBAN" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "accountIBAN" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("amount")}
            >
              Summe{" "}
              {sortConfig.key === "amount" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "amount" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("currency")}
            >
              Währung{" "}
              {sortConfig.key === "currency" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "currency" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("recipientName")}
            >
              Empfänger{" "}
              {sortConfig.key === "recipientName" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "recipientName" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("transactionText")}
            >
              Verwendungszweck{" "}
              {sortConfig.key === "transactionText" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "transactionText" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th
              className="py-3 px-6 text-left font-bold"
              onClick={() => requestSort("date")}
            >
              Datum{" "}
              {sortConfig.key === "date" &&
                sortConfig.direction === "ascending" && <span>▲</span>}
              {sortConfig.key === "date" &&
                sortConfig.direction === "descending" && <span>▼</span>}
            </th>
            <th className="py-3 px-6 text-left font-bold"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {renderTableData()}
        </tbody>
      </table>
      {isModalOpen && editingRowIndex >= 0 && (
        <Modal
          key={editingRowIndex}
          title={isAddingTransaction ? "Hinzufügen" : "Bearbeiten"}
          onSave={(rowData) =>
            isAddingTransaction
              ? handleAddTransaction(rowData)
              : handleRowAction(editingRowIndex, rowData)
          }
          onCancel={() => setIsModalOpen(false)}
          data={
            isAddingTransaction
              ? tableDataState[editingRowIndex]
              : tableDataState[editingRowIndex]
          }
          fetchTransactions={fetchTransactions}
          onDelete={onDelete}
          transformedCategories={transformedCategories}
          isAddingTransaction={isAddingTransaction} 
        />
      )}
    </div>
  );
};
export default TransactionsTable;
