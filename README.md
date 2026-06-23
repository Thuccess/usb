# Unity State Digital Gateway

Official digital portal for the **Ministry of Information & Communications Technology (MICT) – Unity State, Bentiu, South Sudan**.

## Quick start

**1. Backend** (API + MongoDB Atlas)

```powershell
cd Backend
npm install
# Edit .env — set MONGODB_USER to your Atlas username
npm run seed
npm run dev
```

API: http://localhost:4000

**2. Frontend** (portal + admin CMS)

```powershell
cd Frontend
npm install
npm run dev
```

Portal: http://localhost:3000 · Admin: http://localhost:3000/admin

**Default admin** (after seed): `admin@unitystate.gov.ss` / `ChangeMe123!`

| Folder | Description |
|--------|-------------|
| [Frontend](./Frontend) | Next.js public portal + admin CMS |
| [Backend](./Backend) | Express REST API (MongoDB Atlas) |
