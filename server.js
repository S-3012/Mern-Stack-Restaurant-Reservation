import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST'],
  credentials: true,
}));

app.use(express.json());

// In-memory mock database for reservations and orders
const reservations = [];
const orders = [];

app.post('/reservation/send', (req, res) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return res.status(400).json({ message: "Please fill out the entire reservation form!" });
  }

  const newReservation = { firstName, lastName, email, phone, date, time };
  reservations.push(newReservation);
  
  console.log('New Reservation Received:', newReservation);

  return res.status(200).json({
    message: "Reservation Sent Successfully!",
  });
});

app.post('/order/place', (req, res) => {
  const { name, address, phone, items, total } = req.body;
  if (!name || !address || !phone || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid order details" });
  }
  const newOrder = { name, address, phone, items, total, date: new Date() };
  orders.push(newOrder);
  console.log('New Order Received:', newOrder);
  return res.status(200).json({ message: "Order Placed Successfully!" });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
