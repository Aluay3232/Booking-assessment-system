# Sharp Fade Barbershop Booking

Full-stack barbershop booking application with a React frontend, Express REST API, and MySQL persistence. The app includes three views (Home, Booking, Contact) and an interactive map for shop location.

## Technology Stack
- Frontend: React + Vite, React Router, Axios, React Leaflet
- Backend: Node.js, Express, Knex, MySQL
- Containerization: Docker, Docker Compose

## Local Setup (Without Docker)
### Backend
1. `cd backend`
2. `npm install`
3. `npm run dev`

Backend runs on `http://localhost:5000`.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

Frontend runs on `http://localhost:5173`.

## Docker Build and Run
From the project root:
1. `docker compose up --build`

Access the app:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Application Architecture Overview
- **Frontend** (React): renders UI, handles routing, and calls the backend API.
- **Backend** (Express): provides REST endpoints for appointments and manages data access.
- **Database** (MySQL): stores appointment records on a persistent volume.

## Container Architecture & Service Interaction
- `frontend` container builds static assets and serves them via Nginx.
- `backend` container runs the Express API and connects to MySQL.
- `mysql` container stores the data on a persistent volume.

## Application Flow (Frontend ↔ Backend)
1. User signs up or logs in to get a JWT.
2. Frontend stores the token and sends it with API requests.
3. User submits booking form in the frontend.
4. Backend validates and stores the appointment in MySQL.
5. Frontend fetches the latest list of appointments (GET).

## REST API Endpoints
Base URL: `http://localhost:5000/api`
- `POST /auth/register` — create account
- `POST /auth/login` — login and get token
- `GET /appointments` — list all appointments
- `GET /appointments/:id` — get one appointment
- `POST /appointments` — create appointment
- `PUT /appointments/:id` — update appointment
- `DELETE /appointments/:id` — delete appointment
- `GET /health` — health check

## Database Schema (appointments)
| Column | Type | Notes |
| --- | --- | --- |
| id | integer | primary key |
| customer_name | string | required |
| phone | string | required |
| service | string | required |
| date | string | required |
| time | string | required |
| status | string | default: scheduled |
| notes | text | optional |
| created_at | timestamp | auto |
| updated_at | timestamp | auto |

## Environment Variables
### Backend
- `PORT` — API port (default `5000`)
- `DB_CLIENT` — database client (default `mysql2`)
- `DB_HOST` — database host (default `localhost`)
- `DB_PORT` — database port (default `3306`)
- `DB_USER` — database user (default `root`)
- `DB_PASSWORD` — database password (default `rootpassword`)
- `DB_NAME` — database name (default `barbershop_db`)
- `JWT_SECRET` — JWT signing secret
- `CORS_ORIGIN` — allowed origin for CORS (default `*`)

### Frontend (build-time)
- `VITE_API_URL` — backend base URL (default `http://localhost:5000`)

## Deployment Notes (GCP)
1. Create a Linux VM on Compute Engine.
2. Install Docker & Docker Compose.
3. Clone the GitHub repository.
4. Run `docker compose up --build`.
5. Update firewall rules to allow ports `3000` and `5000`.

## Project Structure
```
.
├── backend
│   ├── data
│   ├── src
│   └── Dockerfile
├── frontend
│   ├── src
│   └── Dockerfile
└── docker-compose.yml
```
"# Booking-system" 
