import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(' endpoint accessed');
    res.json({ message: 'Tesla Next-Gen API is running' });
});

import authRoutes from './routes/auth.routes.js';
import carRoutes from './routes/car.routes.js';
import orderRoutes from './routes/order.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(' Error:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
