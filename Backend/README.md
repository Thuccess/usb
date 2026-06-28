# MICT Unity State API

Express REST API for the Unity State Digital Gateway.

## Setup

```bash
npm install
cp .env.example .env
# Set MONGODB_URI to your MongoDB Atlas connection string
npm run seed
npm run dev
```

### Environment Variables

Required in all environments:
- `MONGODB_URI` - MongoDB Atlas connection string (mongodb+srv:// format)
- `JWT_ACCESS_SECRET` - Access token secret (minimum 32 characters)
- `JWT_REFRESH_SECRET` - Refresh token secret (minimum 32 characters)

Get `MONGODB_URI` from MongoDB Atlas: Databases → Connect → Drivers → Copy connection string

### Local Development

For local MongoDB instead of Atlas, use:
```bash
docker compose up -d
export MONGODB_URI=mongodb://localhost:27017/moictusb
npm run dev
```

API runs at http://localhost:4000

## Default admin (after seed)

- Email: `admin@unitystate.gov.ss`
- Password: `ChangeMe123!`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with hot reload |
| `npm run build` | Build shared package and API |
| `npm run start` | Run production build |
| `npm run seed` | Seed database |
| `npm run test` | Run tests |
| `npm run typecheck` | TypeScript type checking |

## Deployment (Render)

1. Create MongoDB Atlas cluster
2. Add Render IP to Atlas Network Access (or allow 0.0.0.0/0)
3. Get mongodb+srv connection string from Atlas
4. In Render dashboard, set `MONGODB_URI` environment variable
5. Set `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` (use Render's "Generate" feature)
6. Deploy using `render.yaml` configuration

Build: `npm install && npm run build --workspace=@moictusb/shared && npm run build`  
Start: `npm start`
