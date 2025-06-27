import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import connectDB from './configs/mongodb.js';  // Ensure this matches the exact file name casing

//app config

const PORT = process.env.PORT || 4000; 
const app = express();
await connectDB();

// initial middleware
app.use(express.json());
app.use(cors());


// API routes
app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.listen(PORT, () => console.log("server is running on port " + PORT));