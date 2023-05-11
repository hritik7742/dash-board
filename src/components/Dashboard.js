import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import DoughnutChart from './datacharts/DoughnutChart';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import PieChart from './datacharts/PieChart';
import LineChart from './datacharts/LineChart';
import BarChart from './datacharts/BarChart';
import '../App.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [formData, setFormData] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      product,
      quantity,
      price,
    };

    console.log('Form Data:', newData);

    try {
      await axios.post('http://localhost:8000/Dashboard', newData);
      setProduct('');
      setQuantity(0);
      setPrice(0);
      setFormData([...formData, newData]);
    } catch (error) {
      console.log(error);
    }
  };

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    processData(formData);
  }, [formData]);

  const processData = (data) => {
    if (data && data.length > 0) {
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

      setChartData(chartData);
    } else {
      setChartData({});
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <div className="dashboard-container">


<nav>
<div className='dashboard-welcome'>
      <h1>Welcome, <span> {location.state.id} </span></h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </nav>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="product">Product:</label>
            <input
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <div className="chart-wrapper">
        <div className='chart-containers'>
        {chartData.labels && chartData.datasets ? (
          
          <Line className='main-line-chart'  data={chartData} />
        ) : (
          <p>No data available</p>
        )}
        </div>
        <div className="chart-container">
          <div className="chart-row">
            <div className="chart-column">
              <DoughnutChart formData={formData} />
            </div>
            <div className="chart-column">
              <PieChart formData={formData} />
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-column">
              <LineChart formData={formData} />
            </div>
            <div className="chart-column">
              <BarChart formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
