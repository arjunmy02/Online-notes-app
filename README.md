Online Notes App — Complete Full-Stack Project
A complete MERN-style notes application matching Project 4 requirements:

React + Vite frontend
Express.js REST API
MongoDB + Mongoose
JWT authentication with bcrypt password hashing
Create, edit, delete, pin and search/filter notes
Per-user note isolation
Note color coding and responsive UI
Requirements
Node.js 18+
MongoDB local installation OR a MongoDB Atlas connection
Run backend
cd backend
copy .env.example .env
# Edit .env and set JWT_SECRET / MONGO_URI
npm install
npm run dev
Run frontend (new terminal)
cd frontend
copy .env.example .env
npm install
npm run dev
Open http://localhost:5173

Windows PowerShell alternative for copying env files
Copy-Item .env.example .env
API
POST /api/auth/register
POST /api/auth/login
GET /api/notes?search=&pinned=true
POST /api/notes
PUT /api/notes/:id
DELETE /api/notes/:id
Authorization uses Bearer <JWT> for note endpoints.
