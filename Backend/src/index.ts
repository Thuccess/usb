import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { connectDatabase, setupConnectionMonitoring } from './config/database';
import { validateJwtSecrets } from './config/jwt';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import adminRoutes from './routes/admin';
import publicRoutes from './routes/public';
import mediaRoutes from './routes/media';
import { resolvePort } from './utils/port';
import { isAllowedOrigin } from './utils/cors';

dotenv.config({ override: true });

function validateEnvironment(): void {
  const required = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `✗ Missing required environment variables:\n  - ${missing.join('\n  - ')}\n` +
      `Ensure these are set in .env or your hosting platform's environment variables.`
    );
    process.exit(1);
  }

  validateJwtSecrets();
}

const app = express();
const requestedPort = resolvePort(process.env.API_PORT || process.env.PORT);
const host = process.env.API_HOST || '0.0.0.0';

// Trust proxy for Render and other hosting platforms
app.set('trust proxy', 1);

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
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'MICT Unity State API is running',
    endpoints: ['/health', '/api/public/home'],
  });
});

app.get('/health', (_req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: isMongoConnected ? 'ok' : 'degraded',
    database: isMongoConnected ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
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
    validateEnvironment();
    console.log('✓ Environment validation passed');

    await connectDatabase();
    setupConnectionMonitoring();
  } catch (error) {
    console.error('✗ Failed to start server:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  const listenOnPort = (port: number) => {
    const server = app.listen(port, host, () => {
      console.log(`✓ API server running on http://${host}:${port}`);
      console.log(`  Environment: ${process.env.NODE_ENV}`);
      console.log(`  Node version: ${process.version}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE' && port === requestedPort) {
        const fallbackPort = port + 1;
        console.warn(`⚠ Port ${port} is already in use. Trying ${fallbackPort} instead.`);
        listenOnPort(fallbackPort);
        return;
      }

      console.error('✗ Failed to start server:', error);
      process.exit(1);
    });
  };

  listenOnPort(requestedPort);
}

if (require.main === module) {
  start().catch((error) => {
    console.error('✗ Unexpected error:', error);
    process.exit(1);
  });
}

export default app;
