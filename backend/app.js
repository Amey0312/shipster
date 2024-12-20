const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const PORT = process.env.PORT || 4000;

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication
app.use('/api/partners', partnerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assignments', assignmentRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

