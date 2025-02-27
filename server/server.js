import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Express
const app = express(); 

// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure JSON request parsing

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
