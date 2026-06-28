import mongoose from 'mongoose';

export function validateAndGetMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI environment variable is required. ' +
      'Set it to a mongodb+srv:// connection string from MongoDB Atlas.'
    );
  }

  if (!uri.startsWith('mongodb+srv://') && !uri.startsWith('mongodb://')) {
    throw new Error(
      `Invalid MONGODB_URI format. Must start with "mongodb+srv://" or "mongodb://". ` +
      `Got: "${uri.slice(0, 50)}..."`
    );
  }

  return uri;
}

function extractDatabaseName(uri: string): string {
  try {
    // Extract database name from mongodb uri
    // Format: mongodb+srv://user:pass@host/dbname?params or mongodb://host/dbname?params
    const match = uri.match(/\/([^/?]+)(\?|$)/);
    return match?.[1] || 'moictusb';
  } catch {
    return 'moictusb';
  }
}

function parseConnectionError(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();

    if (msg.includes('authentication failed') || msg.includes('bad auth')) {
      return 'MongoDB authentication failed. Check username/password in MONGODB_URI.';
    }
    if (msg.includes('getaddrinfo')) {
      return 'DNS resolution failed. Check Atlas cluster domain in MONGODB_URI.';
    }
    if (msg.includes('econnrefused')) {
      return 'Connection refused. Check Atlas IP whitelist allows 0.0.0.0/0 or your IP.';
    }
    if (msg.includes('certificate')) {
      return 'TLS certificate validation failed. Ensure MONGODB_URI uses correct cluster.';
    }
    if (msg.includes('replicaset') || msg.includes('replica set')) {
      return 'Replica set configuration issue. Check Atlas cluster status.';
    }
    if (msg.includes('timeout') || msg.includes('timed out')) {
      return 'Connection timeout. Network issue or Atlas cluster unresponsive.';
    }

    return error.message;
  }

  return String(error);
}

export async function connectDatabase(): Promise<void> {
  const uri = validateAndGetMongoUri();
  const dbName = extractDatabaseName(uri);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: 'majority',
      bufferCommands: false,
    });

    console.log(`✓ Connected to MongoDB: ${dbName}`);
  } catch (error) {
    console.error('✗ MongoDB connection failed:', parseConnectionError(error));
    throw error;
  }
}

export function setupConnectionMonitoring(): void {
  const connection = mongoose.connection;
  const dbName = extractDatabaseName(process.env.MONGODB_URI || 'mongodb://unknown/unknown');

  connection.on('connected', () => {
    console.log(`✓ MongoDB connected: ${dbName}`);
  });

  connection.on('disconnected', () => {
    console.warn('⚠ MongoDB disconnected');
  });

  connection.on('reconnecting', () => {
    console.warn('⚠ MongoDB reconnecting...');
  });

  connection.on('error', (error) => {
    console.error('✗ MongoDB error:', parseConnectionError(error));
  });
}
