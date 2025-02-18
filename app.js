const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const analyticsRoutes = require('./routes/analyticsRoutes.js');

dotenv.config();

const PORT = process.env.PORT || 5000;
const dbURL = process.env.dbURL;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});

//database connection
mongoose.connect(dbURL)
    .then(() => {
        console.log('connected to db');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.json());
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', analyticsRoutes);

app.get('/', (req, res) => {
    res.send("E commerce API is running");
});

