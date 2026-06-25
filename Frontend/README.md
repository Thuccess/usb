# Unity State Digital Gateway — Frontend

Next.js public portal and admin CMS for the Ministry of Information & Communications Technology (MICT), Unity State.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 (admin at `/admin`).

Ensure the [Backend](../Backend) API is running and set `NEXT_PUBLIC_API_URL` in `.env.local`.

## Deploy on Vercel and Render

- In Vercel, set these environment variables for the frontend project:
  - `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
  - `NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app`
- In Render, set these environment variables for the backend service:
  - `CORS_ORIGIN=https://your-frontend.vercel.app`
  - `CORS_ORIGINS=https://your-frontend.vercel.app,https://www.your-frontend.vercel.app`
  - `NODE_ENV=production`
