# Architecture & Configuration

## 1. Environment-Based Configuration
The application is entirely configured through standard environment variables, establishing a consistent local and development-ready baseline. The core values required:
- `DATABASE_URL`: The entire MySQL connection DSN (e.g., `mysql://user:password@localhost:3306/event_platform_db`).
- `PORT`: Server listening port (defaults to `3000` locally, dynamically injected by Railway).
- `JWT_SECRET`: For encoding JWTs in the authentication middleware.

**CRITICAL RULE:** There must be zero branching logic (`if (process.env.NODE_ENV === "production")`) pertaining to database hostnames or file paths.

## 2. Server Startup & Shutdown Flow
1. **Initialize ORM:** Global `PrismaClient` singleton is imported.
2. **Environment Loaded:** `dotenv` loads local `.env` values (skipped dynamically if injected by Railway).
3. **App Initialization (Express):** Global Middlewares attached (CORS, JSON parsers, Helmet security headers).
4. **Route Registration:** Modular routers mounted for `/api/auth`, `/api/admin`, `/api/organizer`, and `/api/public`.
5. **Listen:** Express binds to `process.env.PORT || 3000`.
6. **Shutdown:** Handlers catch `SIGINT` / `SIGTERM` and execute `await prisma.$disconnect()` prior to exiting `process.exit(0)`.

## 3. Database Connection Lifecycle
- A single `PrismaClient` encapsulates the connection pool. Express routes reuse this pool continuously.
- On initialization, Prisma natively utilizes `DATABASE_URL`.
- At build step (for Railway), `prisma generate` creates the client binary specific to the platform.
- Prisma effectively isolates the NodeJS engine from database layer implementation differences between local MySQL and Railway MySQL.

## 4. Stack Characteristics
- **Database:** Prisma with MySQL exclusively.
- **REST Layers:** Standard HTTP JSON responses mapping to React hooks on the frontend.
- **Stateless:** Zero disk-based dependencies or in-memory caches like Redis. Sessions are stateless JWT tokens verifying validity by looking up user records directly in MySQL or maintaining lightweight db-layer refresh scopes.
