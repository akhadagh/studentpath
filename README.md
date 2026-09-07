# StudentPath

Personalised career-to-programme guidance engine for Ghanaian students.

## Architecture

```
studentpath/
├── backend/          # FastAPI Python API
│   ├── app/
│   │   ├── api/      # Route handlers
│   │   ├── core/     # Config, security, database
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic (scoring engine)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/         # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── docker-compose.prod.yml
├── render.yaml
└── vercel.json
```

## Quick Start (Docker)

```bash
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Local Development

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database URL
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@localhost:5432/studentpath |
| SECRET_KEY | JWT secret key | change-me |
| CORS_ORIGINS | Allowed origins JSON array | ["http://localhost:5173"] |
| ENVIRONMENT | development/production | development |

## Deployment

### Render (Recommended)

1. Push to GitHub
2. Connect repo on render.com
3. Render auto-detects `render.yaml`
4. Set `DATABASE_URL` environment variable
5. Deploy

### Vercel (Frontend only)

```bash
vercel deploy
```

## Security Features

- bcrypt password hashing
- JWT authentication
- CORS protection
- Rate limiting via SlowAPI
- SQL injection prevention (SQLAlchemy ORM)
- Input validation (Pydantic)
- Security headers (nginx)
- Non-root Docker user
