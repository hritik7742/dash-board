import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, Chart } from 'chart.js';
import "./Charts.css"


Chart.register(BarElement)

const BarChart = ({ formData }) => {
  const processData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const labels = data.map((entry) => entry.product);
      const quantities = data.map((entry) => entry.quantity);
      const prices = data.map((entry) => entry.price);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Quantity',
            data: quantities,
            backgroundColor: 'blue',
          },
          {
            label: 'Price',
            data: prices,
            backgroundColor: 'green',
          },
        ],
      };

      return chartData;
    }
    return null;
  };

  const chartData = processData(formData);

  return (
    <div>
      {chartData ? (
        <>
          <h2>Bar Chart</h2>
          <Bar  className='Bar-chart' data={chartData} />
        </>
      ) : (
        console.log("no data")
      )}
    </div>
  );
};

export default BarChart;
