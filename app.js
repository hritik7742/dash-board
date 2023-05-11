

const express = require('express');
const { collection, SalesAndOrders } = require('./mongo');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', cors(), (req, res) => {
  // Handle GET request
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json('exist');
    } else {
      res.json('notexist');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json('exist');
    } else {
      res.json('not exist');
      await collection.insertMany([data]);
    }
  } catch (e) {
    console.log('not exists');
  }
});

app.post('/Dashboard', async (req, res) => {
    const { product, quantity, price } = req.body;
  
    const newData = new SalesAndOrders({
      product,
      quantity,
      price
    });
  
    try {
      await newData.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  

  app.get('/Dashboard/sales', async (req, res) => {
    try {
      const orders = await SalesAndOrders.find({}, { _id: 0, createdAt: 1, quantity: 1 }).sort({ createdAt: 1 }); // Fetch data in ascending order based on createdAt field
      const formattedData = orders.map(order => ({
        date: order.createdAt.toISOString().slice(0, 10), // Extract the date portion
        value: order.quantity
      }));
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  

app.listen(8000, () => {
  console.log('Port is connected');
});
