Here's the full install list, organized by what you'll actually run.

1. Prerequisites (install once, system-level)
bash
# Node.js (LTS) — check if you already have it
node -v
npm -v

If missing, grab the LTS installer from nodejs.org. Node 20+ is fine for everything below.

bash
# Git, if you don't have it
git --version
2. Databases

You've got a two-database setup (SQL + MongoDB), plus Redis for caching. Easiest path for a solo project: use free cloud tiers instead of installing local servers — saves you managing local DB processes.

DB	Local install	Free cloud alternative (recommended)
MySQL	sudo apt install mysql-server (Linux) or MySQL Installer (Windows/Mac)	PlanetScale or Railway free tier
MongoDB	mongodb.com/try/download/community	MongoDB Atlas free M0 tier
Redis	sudo apt install redis-server or Docker	Upstash free tier (serverless Redis, works great with Node)

I'd go cloud for all three at this stage — you already used Atlas earlier, so Upstash + PlanetScale keeps the same "no local server to babysit" pattern.

3. Backend — initialize and install
bash
cd backend
npm init -y   # skip if you already have package.json from the scaffold

Core packages you already have:

bash
npm install express cors dotenv mongoose

New ones for this stack:

bash
# SQL - for description, price, rating
npm install mysql2 sequelize

# Redis caching
npm install redis

# Image compression
npm install sharp

# Handling file uploads from the admin form (images/video)
npm install multer

# Admin auth (from the login page we discussed)
npm install jsonwebtoken bcrypt

# Dev-only: auto-restarts server on file changes
npm install --save-dev nodemon

What each does, briefly:

sequelize — ORM for MySQL, lets you define models/queries in JS instead of raw SQL
mysql2 — the actual MySQL driver Sequelize talks through
redis — Node client for your caching layer
sharp — image resize/compress on upload (we covered this earlier)
multer — parses multipart/form-data so Express can receive uploaded files from your admin form
jsonwebtoken / bcrypt — issue login tokens and hash the admin password (never store plain text passwords)
4. Frontend — initialize and install
bash
cd frontend
npm install   # picks up react, react-dom, react-router-dom, vite from the scaffold's package.json

One addition worth making: axios isn't strictly necessary (native fetch works fine, which is what the scaffold uses), but if you want cleaner error handling and interceptors later:

bash
npm install axios
5. Optional but genuinely useful tools
bash
# API testing without writing test scripts

Install Postman or Insomnia as a desktop app (not an npm package) — lets you test your admin routes (login, add product) before the UI exists.

6. Environment variables

Update your .env (backend) to include the new pieces:

# existing
PORT=5000
MONGO_URI=mongodb+srv://...
AMAZON_ASSOCIATE_TAG=yourstore-20

# new
MYSQL_HOST=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_DATABASE=verdana
REDIS_URL=redis://...
JWT_SECRET=generate-a-long-random-string-here
7. Verify everything's wired up
bash
cd backend && npm run dev