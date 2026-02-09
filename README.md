
## Tech Stack

**Frontend:** React, Vite, Redux, Tailwind CSS  
**Backend:** Node.js, Express, Prisma, PostgreSQL  
**DevOps:** Docker & Docker Compose



### Option 1: Docker (Recommended)

## Docker Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Clean restart (removes all data)
docker-compose down -v && docker-compose up -d --build

# View logs
docker logs tesla_backend -f
docker logs tesla_frontend -f

# Access database
docker exec -it tesla_postgres psql -U postgres -d tesla_db
```


That's it! Database will be auto-seeded with 11 cars and admin user.

**Admin Login:**  
- Email: `admin@tesla.com`  
- Password: `admin123`

**Access:**  
- Frontend: http://localhost:7000  
- Backend: http://localhost:5000

---

### Option 2: Local Development

#### Backend Setup

```bash
cd server
npm install

# Setup database
npx prisma db push
npx prisma generate
npm run seed

# Start server
npm run dev
```

Server runs on `http://localhost:5001`

#### Frontend Setup

```bash
cd client
npm install

# Start dev server
npm run dev
```

Frontend runs on `http://localhost:7000`

---

## API Endpoints

**Base URL:**  
- Docker: `http://localhost:5000/api`  
- Local: `http://localhost:5001/api`

### Authentication

#### Register
```bash
POST /api/auth/register

curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'


#### Login
```bash
POST /api/auth/login

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tesla.com","password":"admin123"}'



---

### Cars

#### Get All Cars
```bash
GET /api/cars

# Basic
curl http://localhost:5000/api/cars

# With filters
curl "http://localhost:5000/api/cars?category=SUV&limit=5"
```

**Query Parameters:**
- `search` - Search text
- `category` - Sedan, SUV, Truck, Sports, ATV
- `drive_train` - RWD, AWD, Dual Motor
- `minPrice` / `maxPrice` - Price range
- `page` / `limit` - Pagination
- `sortBy` / `order` - Sorting


#### Get Car by Slug
```bash
GET /api/cars/:slug

curl http://localhost:5000/api/cars/model-3
```

---



```

