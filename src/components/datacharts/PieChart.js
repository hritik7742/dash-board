import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart } from 'chart.js';
import "./Charts.css"

Chart.register(CategoryScale, ArcElement);

const PieChart = ({ formData }) => {
  const processData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const labels = data.map((entry) => entry.product);
      const quantities = data.map((entry) => entry.quantity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            data: quantities,
            backgroundColor: [
              'red',
              'blue',
              'green',
              'yellow',
              'orange',
              'purple',
              'pink',
            ],
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
          <h2>Pie Chart</h2>
          <Pie  className='Pie-chart' data={chartData} />

        </>
      ) : (
        console.log("no data")
      )}
    </div>
  );
};

export default PieChart;
