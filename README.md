# Mahanwadi Party Website

A modern, responsive, and multilingual political party website built with React and Node.js.

## Project Structure
- `/client`: React frontend (Vite, Vanilla CSS, i18next, Framer Motion)
- `/server`: Node.js backend (Express, SQLite-better-sqlite3)

## Setup Instructions

### Prerequisites
- Node.js (v18+)

### 1. Setup Backend
```bash
cd server
npm install
node index.js
```
The server will start on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Features
- **Multilingual**: Toggle between English, Hindi, and Telugu.
- **Leaders**: Interactive leader profiles with detail views.
- **News**: Latest activities and campaigns.
- **Gallery**: Media grid with lightboxes.
- **Volunteers**: Registration form with database persistence.

## Technologies Used
- **Frontend**: React, Vite, Framer Motion, Lucide Icons, i18next.
- **Backend**: Node.js, Express, Better-SQLite3.
- **Styling**: Vanilla CSS (Custom Responsive Design).
