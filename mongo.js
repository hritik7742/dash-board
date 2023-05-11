

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/react-log-tut')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model('collection', newSchema);

const salesAndOrdersSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const SalesAndOrders = mongoose.model('salesAndOrders', salesAndOrdersSchema);

module.exports = { collection, SalesAndOrders };
