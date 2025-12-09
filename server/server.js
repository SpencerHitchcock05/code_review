import express from 'express';
import cors from 'cors';
import authRoutes from './components/auth/auth.routes.js';
import repoRoutes from './components/repo/repo.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Request-With'],
    credentials: true})
);
app.options('*', cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/users', authRoutes);
app.use('/repo', repoRoutes);


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})