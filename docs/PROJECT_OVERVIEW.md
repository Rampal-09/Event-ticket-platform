# Project Overview

## 1. Introduction
The Event Ticket Platform is a robust web application tailored for organizing events, selling tickets, and managing entry via QR codes. The system is split into multiple modules serving public attendees, organizers, scanners, and administrators. 

This document tracks the foundational backend setup. As requested, the frontend is considered locked and finalized.

## 2. Local Development Setup (Prisma + MySQL)
For development, the backend strictly relies on standard Node.js, Express, Prisma ORM, and MySQL. 

- **Database Engine:** MySQL
- **Database Name:** `event_platform_db`
- **ORM:** Prisma
- **No Redis:** JWT refresh tokens and sessions are managed purely via the database.
- **Environment Handling:** A single local `.env` file maps the `DATABASE_URL` (MySQL) and `PORT` (e.g., `3000`).

To set up locally:
1. Spin up your local MySQL instance (e.g., XAMPP).
2. Configure `DATABASE_URL` to point to `mysql://user:password@localhost:3306/event_platform_db`.
3. Run `npx prisma db push` or `prisma migrate dev` to map the schema.
4. Run the Express server.

## 3. Cloud Deployment (Railway)
The backend is architected to be **Railway-safe** out of the box with zero code changes required.

- **Port Binding:** Uses `process.env.PORT` gracefully, which Railway automatically injects.
- **Database Connection:** Railway's MySQL Plugin provisions a `DATABASE_URL` that the existing Prisma client will seamlessly utilize. No environment-branching (`if (env === 'production')`) will be needed.
- **Prisma Generation:** The build step incorporates `prisma generate` to compile the schema directly on Railway's pipeline.
- **No File-System Dependency:** Uploads (if any) are planned for external CDNs; session management strictly uses DB/JWT to avoid container volatility issues.

## 4. Platform Features Used By Frontend
The backend strictly guarantees support for all functionality currently used by the frontend:
- **Public Event Browsing:** Homepage grids, event listing pages, and single event detail views.
- **Ticket Purchasing (Checkout):** A flow for purchasing tickets for a specific event with quantity and basic attendee details.
- **QR Code Generation & Scanning:** Scanning payload processing by event staff to validate ticket authenticity.
- **Organizer Dashboard:** Event creation, event summaries, and financial/sales reports.
- **Admin Management:** Table-based views for verifying, approving, or suspending existing events on the platform.
- **Authentication:** JWT-based login bridging Role-Based Access Control (Admin, Organizer, Tenant).
