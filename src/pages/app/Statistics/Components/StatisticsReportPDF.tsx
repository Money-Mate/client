import React from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { IDashboardData } from "../../../../context/DashboardStore";

interface DownloadPDFButtonProps {
    dashboardData: IDashboardData;
  }

const StatisticsReportPDFButton: React.FC<{ dashboardData: any }> = ({ dashboardData }) => {
  const formatCurrency = (amount: number) => {
    const formattedAmount = amount.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount.endsWith(",00") ? formattedAmount.replace(",00", "") : formattedAmount;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const {
      lastSixMonthsBalance,
      lastSixMonthsIncomeAndExpenses,
      lastSixMonthsExpensesByCategory,

    } = dashboardData;

    // Add content to the PDF
    doc.text("Finanzbericht", 10, 10);

    doc.text("Kontostand der letzten sechs Monate", 10, 20);
    lastSixMonthsBalance.labels.forEach((label: string, index: number) => {
      doc.text(`${label}: ${formatCurrency(lastSixMonthsBalance.data[index])}`, 10, 30 + 10 * index);
    });

    doc.text("Einnahmen und Ausgaben der letzten sechs Monate", 10, 80);
    lastSixMonthsIncomeAndExpenses.labels.forEach((label: string, index: number) => {
      doc.text(`Einnahmen ${label}: ${formatCurrency(lastSixMonthsIncomeAndExpenses.data.income[index])}`, 10, 90 + 10 * index);
      doc.text(`Ausgaben ${label}: ${formatCurrency(lastSixMonthsIncomeAndExpenses.data.expenses[index])}`, 10, 100 + 10 * index);
    });

    doc.text("Ausgaben der letzten sechs Monate nach Kategorie", 10, 150);
    lastSixMonthsExpensesByCategory.forEach((expense: any, index: number) => {
      doc.text(`Kategorie: ${expense.category}, Unterkategorie: ${expense.subCategory}, Betrag: ${formatCurrency(expense.amount)}`, 10, 160 + 10 * index);
    });

    // Save the PDF file
    doc.save("statistics_report.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF} className="m-2 mx-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75">Download PDF</button>
    </div>
  );
};

export default StatisticsReportPDFButton;
