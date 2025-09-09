import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();
const app = express();

// ✅ CORS middleware
app.use(cors({
  origin: 'https://task-manager-theta-sand.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Task routes
app.use('/api/tasks', taskRoutes);

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
