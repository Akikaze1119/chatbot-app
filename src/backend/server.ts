import { neonConfig } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import ws from 'ws';
import express from 'express';
import cors from 'cors';
import router from './routers/router.js';

dotenv.config();
neonConfig.webSocketConstructor = ws;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
