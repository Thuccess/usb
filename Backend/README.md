# MICT Unity State API

Express REST API for the Unity State Digital Gateway.

## Setup

```bash
npm install
cp .env.example .env
# Set MONGODB_USER and MONGODB_PASSWORD for your Atlas cluster
npm run seed
npm run dev
```

Uses MongoDB Atlas (`cluster0.ky880vv.mongodb.net`). For local MongoDB instead, use `docker compose up -d` and set `MONGODB_URI=mongodb://localhost:27017/moictusb`.

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

## Deployment (Render)

Use `render.yaml` in this folder. Set root directory to `Backend` in Render.

Build: `npm install && npm run build --workspace=@moictusb/shared && npm run build`  
Start: `npm start`
