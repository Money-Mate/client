import axios from "axios";
import { useEffect, useState } from "react";
import EditTransactionModal from "../components/UserDashboard/Modals/EditTransactions";
import FilterTransactionsModal from "../components/UserDashboard/Modals/FilterTransactionsModal";

// TODO:
// Modal für filteroptionen
// fetch nach query filteroptions
// pagination
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
  const [editingTransactionId, setEditingTransactionId] = useState<String>("");
  const [transformedCategories, setTransformedCategories] = useState<any[]>([]);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  // fetch data from backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BE_URL}/transaction/getMy`, {
        withCredentials: true,
      });
      setTableDataState(response.data.data);
    } catch (error) {
      console.log(error);
    }
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

  // const onSubmitFilterOptions = async (options: any) => {
  //   try {
  //     const response = await axios.post(
  //       `${BE_URL}/transaction/getMy`,
  //       options,
  //       { withCredentials: true }
  //     );
  //     setTableDataState(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const onCloseFilterModal = () => {
    setIsFilterModalOpen(false);
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

  // render table Data
  const renderTableData = () => {
    // Display TableData
    let visibleRowIndex = 0;
    return tableDataState.map((row, index) => {
      const rowIndex = visibleRowIndex++;
      return (
        <tr key={row._id} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
          <td className="whitespace-nowrap px-6 py-3 text-left">
            {row.accountIBAN}
          </td>
          <td className="whitespace-nowrap px-6 py-3 text-left">
            {row.amount ? row.amount.toFixed(2) : ""} {row.currency}
          </td>
          <td className="whitespace-nowrap px-6 py-3 text-left">
            {row.currency}
          </td>
          <td className="px-6 py-3 text-left">{row.recipientName}</td>
          <td className="px-6 py-3 text-left">{row.transactionText}</td>
          <td className="px-6 py-3 text-left"> {row.date.slice(0, 10)}</td>
          <td>
            <button
              className="text-red-400"
              onClick={(e) => {
                setEditingTransactionId(row._id);
                setEditingRowIndex(rowIndex);
                setIsAddingTransaction(false);
                setIsModalOpen(true);
              }}
            >
              Bearbeiten
            </button>
          </td>
        </tr>
      );
    });

  };

  return (
    <div className="overflow-x-auto h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5"
        onClick={() => {
          setIsAddingTransaction(true);
          setEditingRowIndex(0);
          setIsModalOpen(true);
        }}
      >
        Add Transaction
      </button>
      <button className="rounded bg-blue-500 px-4 py-2 mx-2 font-bold text-white hover:bg-blue-700"
      onClick={()=>{
        setIsFilterModalOpen(true)
      }}>Filter</button>
      <table className="w-full table-auto">
        <thead>

          <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
            <th className="px-6 py-3 text-left font-bold">Konto </th>
            <th className="px-6 py-3 text-left font-bold">Summe </th>
            <th className="px-6 py-3 text-left font-bold">Währung </th>
            <th className="px-6 py-3 text-left font-bold">Empfänger </th>
            <th className="px-6 py-3 text-left font-bold">Verwendungszweck </th>
            <th className="px-6 py-3 text-left font-bold">Datum </th>
            <th className="px-6 py-3 text-left font-bold"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {renderTableData()}
        </tbody>
      </table>
      {isFilterModalOpen && (

          <FilterTransactionsModal  onClose={onCloseFilterModal} />
      )}
      {isModalOpen && editingRowIndex >= 0 && (
        <EditTransactionModal
          key={editingRowIndex}
          title={isAddingTransaction ? "Hinzufügen" : "Bearbeiten"}
          onSave={(rowData) =>
            isAddingTransaction
              ? handleAddTransaction(rowData)
              : handleRowAction(editingRowIndex, rowData)
          }
          onCancel={() => setIsModalOpen(false)}
          data={isAddingTransaction ? {} : tableDataState[editingRowIndex]}
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
