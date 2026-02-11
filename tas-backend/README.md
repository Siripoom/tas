# TAS Backend

Backend API for TAS using Express + TypeScript + Prisma + PostgreSQL + MinIO.

## Stack
- Node.js 20
- Express + TypeScript
- PostgreSQL (Prisma ORM)
- MinIO (S3-compatible storage)
- Docker Compose (api/db/minio/minio-init/pgadmin optional)

## Quick Start (Docker)
1. `cp tas-backend/.env.example tas-backend/.env` (if needed)
2. `docker compose up -d db minio minio-init`
3. `docker compose up -d api`
4. Health check: `curl http://localhost:4556/health`

## Services
- API: `http://localhost:4556`
- PostgreSQL: `localhost:5432`
- MinIO API: `http://localhost:9000`
- MinIO Console: `http://localhost:9001`
- pgAdmin (optional): `docker compose --profile devtools up -d pgadmin`

## Auth and Roles
- Roles: `STUDENT`, `TEACHER`, `DEPT_STAFF`, `FACULTY_ADMIN`, `SUPER_ADMIN`
- Access token + refresh token flow is implemented in `/api/auth/*`

## Key Endpoints
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/change-password`
- `POST /api/auth/register-student`
- `GET/POST/PATCH/DELETE /api/activities`
- `POST /api/activities/:id/apply`
- `GET /api/approvals/pending`
- `POST /api/approvals/:applicationId/approve`
- `POST /api/approvals/:applicationId/request-revision`
- `GET/POST/PATCH/DELETE /api/students/me/records`
- `POST /api/students/me/records/:id/submit`
- `POST /api/files/upload` (multipart)
- `GET /api/files/:id/download`
- `GET /api/students/me/progress`
- `GET /api/reports/student/me.pdf`
- `GET /api/reports/department.xlsx`
- `GET /api/reports/admin.xlsx`
- `GET/POST/PATCH/DELETE /api/users`
- `POST /api/admin/import/students`
- `POST /api/admin/import/teachers`
- `POST /api/admin/import/staff`
- `POST /api/admin/users/:id/reset-password`

## Development (Local)
1. `npm install`
2. start db/minio by docker compose
3. `npm run prisma:generate`
4. `npm run prisma:deploy`
5. `npm run db:seed`
6. `npm run dev`

If you run `npm run start:docker` on local machine, the script now auto-adjusts:
- `DATABASE_URL` host from `db` -> `localhost`
- `S3_ENDPOINT` host from `minio` -> `localhost`
This prevents Prisma `P1001` from trying to reach `db:5432` outside Docker network.

`npm run dev` and `npm run start` also auto-adjust those hosts when running outside Docker.

## Default Seed Accounts
- superadmin / `ChangeMe123!`
- teacher1 / `ChangeMe123!`
- deptstaff1 / `ChangeMe123!`
- facultyadmin1 / `ChangeMe123!`

## Notes
- Upload rule is enforced: maximum 3 images or 1 PDF per owner (`APPLICATION` or `RECORD`).
- Cron job generates notifications every hour.
- API uses UTC datetime in ISO-8601.

## Postman Collection
- Collection file: `tas-backend/postman/TAS-Backend.postman_collection.json`
- Environment file: `tas-backend/postman/TAS-Local.postman_environment.json`
- Import both files into Postman, then run one of login requests in `Auth` to auto-fill `accessToken`/`refreshToken`.
- Collection includes all implemented endpoints in this backend (`/health` and `/api/*`), including multipart upload endpoint `POST /api/files/upload`.
