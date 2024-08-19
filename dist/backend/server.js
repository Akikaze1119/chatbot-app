import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import router from './routers/router.js';
dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const googleGenAIKey = process.env.GOOGLE_GEN_AI_KEY || 'default-key';
const getAI = new GoogleGenerativeAI(googleGenAIKey);
app.post('/gemini', async (req, res) => {
    try {
        const model = getAI.getGenerativeModel({ model: 'gemini-pro' });
        const chat = model.startChat({
            history: req.body.history,
        });
        const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong! Please try again later');
        return error;
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
