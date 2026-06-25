import mongoose from 'mongoose';

const ATLAS_HOSTS = [
  'ac-wlwqmox-shard-00-00.6a12xxy.mongodb.net:27017',
  'ac-wlwqmox-shard-00-01.6a12xxy.mongodb.net:27017',
  'ac-wlwqmox-shard-00-02.6a12xxy.mongodb.net:27017',
].join(',');

function buildAtlasUri(user: string, password: string, database = 'moictusb'): string {
  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  return `mongodb://${encodedUser}:${encodedPassword}@${ATLAS_HOSTS}/${database}?ssl=true&authSource=admin&replicaSet=atlas-qbq8ti-shard-0`;
}

export function getMongoUri(): string {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const database = process.env.MONGODB_DATABASE || 'moictusb';

  if (user && password) {
    return buildAtlasUri(user, password, database);
  }

  return 'mongodb://localhost:27017/moictusb';
}

export function shouldSkipDatabaseConnection(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.SKIP_DB_CONNECT === 'true' || env.SKIP_DB_CONNECT === '1') {
    return true;
  }

  const hasMongoUri = Boolean(env.MONGODB_URI);
  const hasMongoCredentials = Boolean(env.MONGODB_USER && env.MONGODB_PASSWORD);

  return env.NODE_ENV === 'production' && !hasMongoUri && !hasMongoCredentials;
}

export async function connectDatabase(): Promise<void> {
  if (shouldSkipDatabaseConnection()) {
    console.warn('MongoDB connection skipped. Set MONGODB_URI or MONGODB_USER/MONGODB_PASSWORD to enable database-backed features.');
    return;
  }

  const uri = getMongoUri();
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed. Check MongoDB settings in Backend/.env or Render environment variables.');
    throw error;
  }
}
