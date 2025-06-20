const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ulandi'))
  .catch(err => console.error('MongoDB xatosi:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} da ishlamoqda`));
