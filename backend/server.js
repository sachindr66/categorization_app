const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes'); 
require('dotenv').config();

const app = express();
connectDB();
app.use(cors(
    {
        origin:['https://categorization-app-frontend.vercel.app'],
        methods:['POST','GET'],
        credentials:true
    }
));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/user', userRoutes); 

app.use('*', (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;