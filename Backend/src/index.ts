import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import adminRoutes from './routes/admin';
import publicRoutes from './routes/public';
import mediaRoutes from './routes/media';
import { resolvePort } from './utils/port';
import { isAllowedOrigin } from './utils/cors';

dotenv.config({ override: true });

const app = express();
const requestedPort = resolvePort(process.env.API_PORT || process.env.PORT);
const host = process.env.API_HOST || '0.0.0.0';

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'MICT Unity State API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/media', mediaRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDatabase();
  } catch (error) {
    console.warn('Continuing without a database connection so the server can still start.');
    console.warn(error);
  }

  const listenOnPort = (port: number) => {
    const server = app.listen(port, host, () => {
      console.log(`API server running on http://${host}:${port}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE' && port === requestedPort) {
        const fallbackPort = port + 1;
        console.warn(`Port ${port} is already in use. Trying ${fallbackPort} instead.`);
        listenOnPort(fallbackPort);
        return;
      }

      console.error('Failed to start server:', error);
      process.exit(1);
    });
  };

  listenOnPort(requestedPort);
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
