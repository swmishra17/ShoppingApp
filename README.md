# Mini Shopping App

A premium full-stack shopping list app built with React + Vite on the frontend and Express + SQLite on the backend. It supports adding, editing, deleting, filtering, and marking items as purchased.

## Features
- Add shopping items with validation
- Edit existing item details
- Delete items from the list
- Mark items as purchased or pending
- Filter items by all, pending, and purchased
- Real backend persistence with SQLite
- Premium dark luxury dashboard UI
- Production-friendly frontend/backend configuration

## Tech Stack
- React
- Vite
- Express
- Node.js
- SQLite
- CSS

## Project Structure

```text
mini-shopping-app/
├── backend/
│   ├── data/
│   ├── db.js
│   ├── server.js
│   ├── server.test.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── dist/
├── .gitignore
├── README.md
└── .git/
```

## Prerequisites
- Node.js 18+
- npm
- Git

## Run Locally on Windows

1. Start the backend:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\backend
npm install
node server.js
```

2. In a second terminal, start the frontend:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\frontend
npm install
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:5173/
```

The backend API runs at:

```text
http://localhost:5000/api/items
```

## Production Build

To build the frontend for production:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\frontend
npm run build
```

## Backend Testing

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\backend
npm test
```

## Environment Variables

Frontend example:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api/items
```

Backend example:

```env
PORT=5000
```

## Deployment

### Render (Backend)
- Root directory: `mini-shopping-app/backend`
- Build command: `npm install`
- Start command: `node server.js`

### Vercel (Frontend)
- Root directory: `mini-shopping-app/frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add env variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api/items
```

## Notes
- Data persists in SQLite, so it survives server restarts.
- This is suitable for demo, portfolio, or deployment-ready app use.

## GitHub

```powershell
git add .
git commit -m "Production ready"
git push origin main
```
