import axios from "axios";
import { useEffect, useState } from "react";

import { Pagination } from "antd";
import EditTransactionModal from "./Modals/EditTransactions";
import FilterTransactionsModal from "./Modals/FilterTransactionsModal";

// TODO:

// grouping?
// Table: währung weg, stattdessen bei summe, dafür kategorie, subkategorie, tags

export interface TransactionData {
  _id: string;
  accountIBAN: string;
  date: string;
  transactionText: string;
  recipientName: string;
  recipientIBAN: string;
  amount: number;
  currency: string;
  category: {
    name: string;
    _id: string;
  };
  subCategory: {
    name: string;
    _id: string;
  };
  tags: string[];
}

export interface OptionsData {
  accounts?: string[];
  categories?: string[];
  subCategories?: string[];
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
  date?: "asc" | "desc";
  amount?: "pos" | "neg";
}

export interface Transactions {
  page: number | 1;
  maxDocs: number | 20;
  data: {
    _id: string;
    accountIBAN: string;
    amount: number;
    category: string;
    subCategory: string;
    date: string;
    description: string;
    note: string;
  }[];
}

const BE_URL = import.meta.env.VITE_BE_PORT;

const TransactionsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Table and editing rows
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [tableDataState, setTableDataState] = useState<TransactionData[]>([]);
  const [editingTransactionId, setEditingTransactionId] = useState<String>("");
  const [transformedCategories, setTransformedCategories] = useState<any[]>([]);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  //Filter Transactions
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<OptionsData>({});
  const [selectedOptions, setSelectedOptions] = useState<OptionsData>({});
  const [subCategories, setSubCategories] = useState<any[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [maxDocs, setMaxDocs] = useState(20);
  const [docsPerPage, setDocsPerPage] = useState(10);
  const [pageSize, setPageSize] = useState(10);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get(
        `${BE_URL}/transaction/getFilterOptions`,
        {
          withCredentials: true,
        }
      );
      setFilterOptions(response.data);
      setIsFilterModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async (
    page = currentPage,
    pageSize = docsPerPage
  ) => {
    try {
      console.log("page // pagesize in fetch", page, pageSize);
      const url = `${BE_URL}/transaction/getMy`;
      const response = await axios.get(url, {
        params: {
          ...selectedOptions,
          page: Math.ceil((page * pageSize) / pageSize),
          docsPerPage: pageSize,
        },
        withCredentials: true,
      });
      setTableDataState(response.data.data);

      setCurrentPage(page);
      setMaxDocs(response.data.totalDocs);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchSubCategories = async (categoryId: string) => {
  //   const BE_URL = import.meta.env.VITE_BE_PORT;
  //   try {
  //     const response = await axios.get(
  //       `${BE_URL}/subcategory/getSubByCategory/${categoryId}`,
  //       { withCredentials: true }
  //     );
  //     const transformedSubCategories = response.data.map(
  //       (subCategory: any) => ({
  //         id: subCategory._id,
  //         name: subCategory.name,
  //       })
  //     );
  //     setSubCategories(transformedSubCategories);
  //     console.log(subCategories);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onCloseFilterModal = () => {
    fetchTransactions();
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    fetchCategories();

    // Only fetch transactions on mounting if currentPage is 1
    if (currentPage === 1) {
      fetchTransactions();
    }
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
  // render table Data
  const renderTableData = () => {
    let visibleRowIndex = 0;
    const data = tableDataState ?? [];
    if (data.length === 0) {
      return (
        <tr>
          <td
            className="bg-mm-foreground px-6 py-3 text-left text-mm-text-dark"
            colSpan={8}
          >
            Zu deiner Anfrage gibt es keine passenden Daten
          </td>
        </tr>
      );
    }
    return data.map((row, index) => {
      const rowIndex = visibleRowIndex++;
      return (
        <tr
          key={row._id}
          className={
            rowIndex % 2 === 0
              ? "bg-mm-foreground text-mm-text-dark"
              : "text-mm-text-dark"
          }
        >
          <td className="whitespace-nowrap px-6 py-3 text-left  ">
            {row.accountIBAN}
          </td>
          <td className="whitespace-nowrap px-6 py-3 text-left  ">
            {row.amount ? row.amount.toFixed(2) : ""} {row.currency}
          </td>
          <td className="px-6 py-3 text-left">{row.recipientName}</td>
          <td className="px-6 py-3 text-left">{row.transactionText}</td>
          <td className="whitespace-nowrap px-6 py-3 text-left  ">
            {row.category.name}
          </td>
          <td className="whitespace-nowrap px-6 py-3 text-left  ">
            {row.subCategory.name}
          </td>
          <td className="px-6 py-3 text-left ">{row.tags}</td>
          <td className="px-6 py-3 text-left ">{row.date.slice(0, 10)}</td>
          <td>
            <button
              className="bold text-teal-500"
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
    <div className="h-screen overflow-x-auto">
      <button
        className="mx-5 my-2 rounded bg-mm-primary px-4 py-2 font-bold text-mm-text-white hover:bg-blue-700"
        onClick={() => {
          setIsAddingTransaction(true);
          setEditingRowIndex(0);
          setIsModalOpen(true);
        }}
      >
        Transaktion hinzufügen
      </button>
      <button
        className="mx-2 my-2 rounded bg-mm-primary px-4 py-2 font-bold text-mm-text-white hover:bg-blue-700"
        onClick={() => {
          fetchFilterOptions();
        }}
      >
        Filter
      </button>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-mm-foreground text-sm uppercase leading-normal text-mm-text-white">
            <th className="px-6 py-3 text-left font-bold">Konto</th>
            <th className="px-6 py-3 text-left font-bold">Summe</th>
            <th className="px-6 py-3 text-left font-bold">Empfänger</th>
            <th className="px-6 py-3 text-left font-bold">Verwendungszweck</th>
            <th className="px-6 py-3 text-left font-bold">Kategorie</th>
            <th className="px-6 py-3 text-left font-bold">Unterkategorie</th>
            <th className="px-6 py-3 text-left font-bold">Tags</th>
            <th className="px-6 py-3 text-left font-bold">Datum</th>
            <th className="px-6 py-3 text-left font-bold"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-mm-background">
          {renderTableData()}
        </tbody>
      </table>

      <Pagination
        className="mt-5 text-mm-background"
        current={currentPage}
        total={maxDocs}
        pageSize={pageSize}
        showSizeChanger={true}
        pageSizeOptions={["10", "20", `${maxDocs >=50? 50 : null}`, `${maxDocs}`]}
        onChange={(newPage, newPageSize) => {
          if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setDocsPerPage(newPageSize);
            setCurrentPage(1);
            setPageSize(newPageSize);
            fetchTransactions(1, newPageSize);
          } else {
            setCurrentPage(newPage);
            fetchTransactions(newPage, pageSize);
          }
        }}
      />
      {isFilterModalOpen && (
        <FilterTransactionsModal
          onClose={onCloseFilterModal}
          filteredOptions={filterOptions}
          setOptions={setSelectedOptions}
          options={selectedOptions}
        />
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
