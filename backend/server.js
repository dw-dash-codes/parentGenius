import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. IMPORT YOUR NEW ROUTES HERE
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDb"))
  .catch((error) => console.error("Error Connecting to MongoDB", error.message));

app.get('/api/health', (req,res) => {
    res.status(200).json({message: 'Backend is running and healthy!'});
});

// 2. TELL EXPRESS TO USE YOUR NEW ROUTES HERE
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});