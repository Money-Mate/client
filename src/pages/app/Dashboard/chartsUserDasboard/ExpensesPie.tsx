import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration, ChartData } from "chart.js";
import useDashboardStore from "../../../../context/DashboardStore";
import { tealcolors, skyColors } from "../../../../context/Colors";

interface InvestmentProps {
  setClickedData?: Function;
}

interface CategoryData {
  category: string;
  amount: number;
}

const ExpensesPie = ({ setClickedData }: InvestmentProps) => {
  const lastSixMonthsExpensesByCategory = useDashboardStore(
    (state) => state.dashboardData?.lastSixMonthsExpensesByCategory
  );

  if (lastSixMonthsExpensesByCategory === undefined) {
    return <div>Loading...</div>;
  }

  const categories = lastSixMonthsExpensesByCategory.reduce(
    (acc: CategoryData[], { category, amount }) => {
      const index = acc.findIndex((item) => item.category === category);
      if (index === -1) {
        acc.push({ category, amount });
      } else {
        acc[index].amount += amount;
      }
      return acc;
    },
    []
  );

  categories.sort((a, b) => b.amount - a.amount);

  const data: ChartData<
    "doughnut",
    (number | [number, number] | null)[],
    unknown
  > = {
    labels: categories.map((category) => category.category),
    datasets: [
      {
        label: "Wert in €",
        data: categories.map((category) => category.amount),
        backgroundColor: skyColors.map((color) => color),
        hoverBackgroundColor: tealcolors.map((color) => color),
        borderColor: [""],
        borderWidth: 0,
      },
    ],
  };

  const [chartData, setChartData] = useState(data);

  const options: ChartConfiguration["options"] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0 && elements[0].index !== undefined) {
        const index = elements[0].index;
        const label = data.labels?.[index];

        const subcategoriesWithAmounts = lastSixMonthsExpensesByCategory
          .filter((category) => category.category === label)
          .sort((a, b) => b.amount - a.amount);
        const subcategories = subcategoriesWithAmounts.map(
          (category) => category.subCategory
        );
        const amounts = subcategoriesWithAmounts.map(
          (category) => category.amount
        );

        setChartData({
          labels: subcategories,
          datasets: [
            {
              label: "Wert in €",
              data: amounts,
              backgroundColor: skyColors.map((color) => color),
              hoverBackgroundColor: tealcolors.map((color) => color),
              borderColor: [""],
              borderWidth: 0,
            },
          ],
        });

        setClickedData?.({ label, value: data.datasets[0].data[index] });
      } else {
        setClickedData?.(undefined);
        setChartData(data);
      }
    },
  };

  return (
    <>
      <Doughnut data={chartData} options={options} />
    </>
  );
};

export default ExpensesPie;
