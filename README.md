# Tesla Next-Gen Application 🚗⚡

A full-stack web application for browsing, customizing, and ordering Tesla vehicles. Built with modern technologies including React, Node.js, PostgreSQL, and Docker.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Option 1: Docker (Recommended)](#option-1-docker-recommended)
  - [Option 2: Local Development](#option-2-local-development)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- 🚗 Browse 13 Tesla vehicle models
-   Customize vehicles with variants and colors
- 💰 Real-time price calculator
- 👤 User authentication (register/login)
- 🛒 Order management system
- 📱 Responsive design
- 🐳 Docker-ready deployment
- 🔄 Auto-seeding database

---

## 🛠 Tech Stack

**Frontend:**
- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js 18+
- Express
- Prisma ORM
- PostgreSQL
- Redis
- JWT Authentication

**DevOps:**
- Docker & Docker Compose
- ES6 Modules

---

## 📦 Prerequisites

### For Docker Deployment
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- Git

### For Local Development
- Node.js 18+ and npm
- PostgreSQL 15+
- Redis 6+ (optional)
- Git

---

## 🚀 Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the application. Database is **automatically seeded** on startup.

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd tesla
```

#### Step 2: Start All Services
```bash
docker-compose up -d
```

That's it! The application will:
- ✅ Start PostgreSQL database
- ✅ Start Redis cache
- ✅ Build and start backend API
- ✅ **Automatically seed database** with admin user and 13 Tesla vehicles
- ✅ Build and start frontend

#### Step 3: Access the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000
- **Admin Login**: admin@tesla.com / admin123

#### Useful Docker Commands

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Stop and remove all data (clean restart)
docker-compose down -v

# Restart a specific service
docker-compose restart backend
```

---

### Option 2: Local Development

For development with hot-reload capabilities.

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd tesla
```

#### Step 2: Install PostgreSQL & Redis

**PostgreSQL:**
- Download and install from https://www.postgresql.org/download/
- Create a database named `tesla_db`

**Redis (Optional):**
- Download from https://redis.io/download/
- Start Redis server: `redis-server`

#### Step 3: Set Up Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/tesla_db?schema=public"
PORT=5001
JWT_SECRET="supersecret-tesla-key"
REDIS_URL="redis://localhost:6379"
FRONTEND_URL="http://localhost:5174"
EOL

# Push database schema
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed database with data
npm run seed

# Start development server
npm run dev
```

Server will start on http://localhost:5001

#### Step 4: Set Up Frontend

Open a new terminal:

```bash
cd client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5001/api" > .env

# Start development server
npm run dev
```

Frontend will start on http://localhost:5174

#### Step 5: Access the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5001
- **Admin Login**: admin@tesla.com / admin123

---

## 📁 Project Structure

```
tesla/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store & slices
│   │   └── App.jsx         # Main app component
│   ├── Dockerfile          # Frontend Docker image
│   └── package.json
│
├── server/                  # Backend Node.js application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── prisma.js       # Prisma client
│   │   └── index.js        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Database seed script
│   ├── Dockerfile          # Backend Docker image
│   ├── docker-entrypoint.sh # Auto-seed script
│   └── package.json
│
└── docker-compose.yml       # Docker orchestration
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000  (Docker)
http://localhost:5001  (Local)
```

### Endpoints

#### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

#### Cars
```http
GET  /api/cars              # Get all cars (with filters)
GET  /api/cars/:slug        # Get car by slug
```

Query parameters for `/api/cars`:
- `search` - Search by name/description
- `category` - Filter by category (Sedan, SUV, Truck, Sports, ATV)
- `drive_train` - Filter by drivetrain
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

#### Orders
```http
POST /api/orders                  # Create new order
GET  /api/orders                  # Get all orders
GET  /api/orders/user/:userId     # Get user's orders
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/tesla_db?schema=public"
PORT=5001
JWT_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
FRONTEND_URL="http://localhost:5174"
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5001/api
```

**Note:** For Docker, environment variables are configured in `docker-compose.yml`

---

## 🗄 Database

### Pre-loaded Data

The database comes pre-seeded with:

**Admin User:**
- Email: admin@tesla.com
- Password: admin123
- Role: ADMIN

**13 Tesla Vehicles:**
- Model S, Model S Plaid
- Model 3, Model 3 Performance
- Model X, Model X Plaid
- Model Y, Model Y Performance
- Cybertruck, Cyberbeast
- Roadster, Tesla Semi, Cyberquad

Each vehicle includes multiple variants and color options.

### Database Commands

**Docker:**
```bash
# Access database
docker-compose exec db psql -U postgres -d tesla_db

# Re-seed database
docker-compose exec backend npm run seed

# View database in Prisma Studio
docker-compose exec backend npx prisma studio
```

**Local:**
```bash
# Re-seed database
cd server
npm run seed

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

---

## 🐛 Troubleshooting

### Docker Issues

**Containers won't start:**
```bash
# View detailed logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

**Database not seeding:**
```bash
# Check backend logs
docker-compose logs backend | grep -i "seed"

# Manually seed
docker-compose exec backend npm run seed
```

**Port conflicts:**
Edit `docker-compose.yml` and change port mappings:
```yaml
services:
  backend:
    ports:
      - "8000:5000"  # Change left number to available port
```

### Local Development Issues

**Database connection error:**
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env`
- Ensure database `tesla_db` exists

**Port already in use:**
```bash
# Find process using port 5001
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows

# Kill process or change PORT in .env
```

**Prisma errors:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database
npx prisma db push --force-reset
```

---

## 📝 Development Notes

### Code Style
- **Backend**: ES6 modules (`import/export`)
- **Frontend**: React with Hooks
- **Styling**: Tailwind CSS

### Key Features
- ✅ Full TypeScript-free JavaScript codebase
- ✅ ES6 modules in Node.js backend
- ✅ Auto-seeding in Docker
- ✅ Hot reload in development
- ✅ Production-ready Docker images

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally and with Docker
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎯 Quick Reference

| Action | Docker | Local |
|--------|--------|-------|
| **Start** | `docker-compose up -d` | `npm run dev` (in both folders) |
| **Stop** | `docker-compose down` | `Ctrl+C` |
| **Logs** | `docker-compose logs -f` | Check terminal |
| **Seed DB** | Automatic on startup | `npm run seed` |
| **Frontend** | http://localhost:5174 | http://localhost:5174 |
| **Backend** | http://localhost:5000 | http://localhost:5001 |
| **Admin** | admin@tesla.com / admin123 | admin@tesla.com / admin123 |

---

**Made with ⚡ by the Tesla Dev Team**
