# Event Ticket Platform

A modern web application for event organizers, attendees, and entry management. This platform facilitates seamless event discovery, ticket purchasing, and secure venue entry using QR code technology.

## 🚀 Overview

The Event Ticket Platform is designed to handle the full lifecycle of an event:
- **Organizers** can create events, manage galleries, set up promo codes, and track sales.
- **Attendees** can browse events, purchase tickets securely, and manage their QR-coded entry passes.
- **Staff** can quickly validate tickets at the venue gate using a built-in QR scanner.
- **Admins** maintain platform quality through a robust event approval and moderation workflow.

## 📂 Documentation

Detailed documentation for the platform is available in the `docs/` directory:

- 📋 **[PRD](docs/prd.md)**: Product Requirement Document including Phase 1 Extended Features.
- 🏗️ **[Architecture](docs/architecture.md)**: System design, database models, and QR validation logic.
- 👥 **[Roles & RBAC](docs/roles.md)**: Definition of system roles (Attendee, Organizer, Staff, Admin) and the permission matrix.
- 🔄 **[Frontend Workflow](docs/frontend-workflow.md)**: Detailed user journeys and interface interactions.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, React Router.
- **Backend:** Node.js / Express (Planned).
- **Database:** SQL (PostgreSQL/MySQL planned).
- **Auth:** Role-Based Access Control (RBAC).

## 🔑 Key Features

- **Event Discovery:** Search and browse upcoming public events.
- **Secure Ticketing:** Automatic QR code generation for every purchase.
- **Promotion Tools:** Support for multi-photo galleries and event-specific promo codes.
- **Urgency Cues:** "Selling Fast" and "Almost Sold Out" indicators to boost conversion.
- **Private Access:** Support for private events accessible only via direct links.
- **Admin Moderation:** Full approval/rejection lifecycle for all submitted events.

---

*This project is currently in the architectural documentation and documentation refinement phase.*
