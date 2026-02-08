const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false, // For development ease
}));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Tesla Next-Gen API is running' });
});

const authRoutes = require('./routes/auth.routes');
const carRoutes = require('./routes/car.routes');
const orderRoutes = require('./routes/order.routes');

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
