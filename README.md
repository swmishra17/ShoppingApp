# Mini Shopping App

A small full-stack shopping list app built with React + Vite on the frontend and Express on the backend. It supports adding, editing, deleting, filtering, and marking items as purchased.

## Features
- Add new shopping items
- Edit existing items
- Delete items
- Mark items as purchased or pending
- Filter by all, pending, and purchased
- Validation for empty product names and invalid quantities
- Local persistence on the frontend
- Premium dark luxury UI

## Project structure

```text
mini-shopping-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
├── .gitignore
├── README.md
└── package.json
```

## Prerequisites
- Node.js 18+
- npm

## Run locally on Windows

1. Open PowerShell in the project root.
2. Start the backend:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\backend
npm install
node server.js
```

3. In a second PowerShell window, start the frontend:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\frontend
npm install
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:5173/
```

The backend API will run at:

```text
http://localhost:5000/api/items
```

## Production build

To build the frontend for production:

```powershell
cd C:\Users\aarav\Downloads\ReactApp\mini-shopping-app\frontend
npm run build
```

## Tech stack
- React
- Vite
- Express
- Node.js
- CSS

## Notes
- The frontend stores data in localStorage for convenience.
- The backend uses an in-memory array for the shopping list, so data resets when the server restarts.

## GitHub
This project is set up as a Git repository and can be pushed to your GitHub remote with:

```powershell
git add .
git commit -m "Style enhancement"
git push origin main
```
