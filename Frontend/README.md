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

## Deploy on Vercel

- Root directory: `Frontend`
- Environment: `NEXT_PUBLIC_API_URL=https://your-api.onrender.com`
