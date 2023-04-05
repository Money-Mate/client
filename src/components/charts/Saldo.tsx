import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';

const getBarColors = (values: number[]): string[] => {
  return values.map(value => value >= 0 ? '#2ECC40' : '#FF4136');
};

const Saldo = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Saldo',
        data: [ -70, -60, 3, 50, -100, 300],
        backgroundColor: getBarColors([ -70, -60, 3, 50, -100, 300])
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Saldo Chart',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '€' + value;
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default Saldo;
