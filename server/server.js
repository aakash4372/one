const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const quoteRoutes = require('./routes/quotes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: '*', // or whatever port your React app runs on
    credentials: true
  }));
app.use(express.json());

app.use('/api/quotes', quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));