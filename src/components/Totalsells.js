import React from 'react'
import "../App.css"
import {Line} from 'react-chartjs-2'
import { CategoryScale, Chart, LineElement, LinearScale, PointElement } from 'chart.js';

Chart.register(CategoryScale,LinearScale,PointElement,LineElement);

function Totalsells() {
  
  const data={
    labels:['1May','15May', '30May'],
    datasets:[
      {
        data:[1,15,30],
        label:'Data',
        borderColor:'rgb(75, 192, 192)',
        fill:false,
      },
    ],
  };

  //options for the chart

  const options={
    scales:{
      x:{
        ticks: {
          callback: function (value, index, ticks) {
            // Format the tick value to match the desired format
            const formattedValue = new Date(value).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            // Display only specific date labels on the y-axis
            if (formattedValue === 'May1' || formattedValue === 'May13' || formattedValue === 'May30') {
              return formattedValue;
            }
            return ''; // Hide other labels
          },
        },
      },
      y:{
       display:false,
      },
    },
  };

  return (
    <div className='Total-sells'> 
      <h2>Total sells</h2>
      <p>Payment received across all channels</p>
      <Line data={data} options={options}/>
      </div>
  )
}

export default Totalsells