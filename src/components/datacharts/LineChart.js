import React from 'react';
import { Line } from 'react-chartjs-2';
import "./Charts.css"

const LineChart = ({ formData }) => {
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
            borderColor: 'blue',
          },
          {
            label: 'Price',
            data: prices,
            borderColor: 'green',
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
          <h2>Line Chart</h2>
          <Line   className='Line-chart'  data={chartData} />
        </>
      ) : (
        console.log("no data")
      )}
    </div>
  );
};

export default LineChart;
