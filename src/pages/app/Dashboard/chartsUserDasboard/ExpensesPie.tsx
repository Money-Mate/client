import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartConfiguration, ChartData } from "chart.js";
import useDashboardStore from "../../../../context/DashbordStore";

interface InvestmentProps {
  setClickedData?: Function;
}

interface CategoryData {
  category: string;
  amount: number;
}

interface LastSixMonthsExpenses {
  category: string;
  subCategory: string;
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

  const subcategories = lastSixMonthsExpensesByCategory.map(
    (category: LastSixMonthsExpenses) => category.subCategory
  );

  const amounts = lastSixMonthsExpensesByCategory.map(
    (category: LastSixMonthsExpenses) => category.amount
  );

  const skyColors = [
    "#082f49",
    "#0C4A6E",
    "#075985",
    "#0369A1",
    "#0284C7",
    "#0EA5E9",
    "#38BDF8",
    "#7DD3FC",
    "#BAE6FD",
    "#E0F2FE",
    "#F0F9FF",
  ];

  const violetcolors = [
    "#2e1065",
    "#4c1d95",
    "#5b21b6",
    "#6d28d9",
    "#7c3aed",
    "#8b5cf6",
    "#a78bfa",
    "#c4b5fd",
    "#ddd6fe",
    "#ede9fe",
    "#f5f3ff",
  ];

  const stockColor = skyColors[2];
  const stockcolorHover = violetcolors[2];
  const kryptoColor = skyColors[3];
  const kryptoColorHover = violetcolors[3];
  const realEstateColor = skyColors[4];
  const realEstateColorHover = violetcolors[4];
  const edelmetalleColor = skyColors[5];
  const edelmetalleColorHover = violetcolors[5];

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

        backgroundColor: [
          stockColor,
          kryptoColor,
          realEstateColor,
          edelmetalleColor,
        ],
        hoverBackgroundColor: [
          stockcolorHover,
          kryptoColorHover,
          realEstateColorHover,
          edelmetalleColorHover,
        ],
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
        position: "bottom",
        align: "center",
        labels: {
          color: "#fff",
        },
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
              backgroundColor: skyColors.slice(0, subcategories.length),
              hoverBackgroundColor: violetcolors.slice(0, subcategories.length),
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
