import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';
import express from 'express';
import cors from 'cors';
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
