import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js/auto";

const getBarColors = (values: number[]): string[] => {
  return values.map((value, index) => {
    const opacity = index === values.length - 1 ? "60" : "ff";
    return value >= 0 ? `#2ECC40${opacity}` : `#FF4136${opacity}`;
  });
};

const Saldo = () => {
  // beispiel wie man local(in der card) die daten aus dem backend holen würde
  // ------------------------------------------------------------------------
  // const [backendData, setBackendData] = useState({ labels: [], data: [] });
  // useEffect(() => {
  //   const fetch = (async () => {
  //     const res = await axios.get("http://localhost:8000/dashboard/main", {
  //       withCredentials: true,
  //     });
  //     setBackendData(res.data.lastSixMonthsBalance);
  //     console.log(res);
  //   })();
  // }, []);

  // const data: ChartData<"bar"> = {
  //   labels: backendData.labels,
  //   datasets: [
  //     {
  //       label: "Saldo",
  //       data: backendData.data,
  //       backgroundColor: getBarColors(backendData.data),
  //     },
  //   ],
  // };
  // ------------------------------------------------------------------------

  const data: ChartData<"bar"> = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Saldo",
        data: [-70, -60, 3, 50, -100, 300],
        backgroundColor: getBarColors([-70, -60, 3, 50, -100, 300]),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Saldo Chart",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "€" + value;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Saldo;
