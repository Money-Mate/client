import React from "react";

interface TableRowData {
  Konto: string;
  Summe: number;
  Währung: string;
  Empfänger: string;
  Verwendungszweck: string;
}

const tableData: TableRowData[] = [
  {
    Konto: "Konto 1",
    Summe: 100.0,
    Währung: "EUR",
    Empfänger: "Max Mustermann",
    Verwendungszweck: "Miete",
  },
  {
    Konto: "Konto 2",
    Summe: 200.0,
    Währung: "USD",
    Empfänger: "John Doe",
    Verwendungszweck: "Shopping",
  },
  {
    Konto: "Konto 3",
    Summe: 50.0,
    Währung: "GBP",
    Empfänger: "Jane Doe",
    Verwendungszweck: "Geschenk",
  },
];

const Table: React.FC = () => {
  const handleEditRow = (index: number) => {
    console.log(`Edit row ${index}`);
  };

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
            <th className="py-3 px-6 text-left font-bold">Aktionen</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.Konto}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.Summe.toFixed(2)} {row.Währung}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {row.Währung}
              </td>
              <td className="py-3 px-6 text-left">{row.Empfänger}</td>
              <td className="py-3 px-6 text-left">{row.Verwendungszweck}</td>
              <td className="py-3 px-6 text-left">
                <button onClick={() => handleEditRow(index)}>Bearbeiten</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
