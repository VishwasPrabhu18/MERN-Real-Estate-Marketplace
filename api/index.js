import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/user_route.js";
import authRouter from "./routes/auth_route.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => { 
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', router);
app.use('/api/auth', authRouter);
