# System Architecture

The platform uses a standard web application architecture.

Frontend → Backend → SQL Database

---

# 1. Frontend Layer

Frontend handles the user interface and user interactions.

Technologies used:

* JavaScript
* React
* Vite
* TailwindCSS
* React Router

Responsibilities:

* Rendering UI pages
* Handling user input
* Navigation between pages
* Generating QR codes
* Scanning QR codes
* Calling backend APIs

Frontend pages include:

Public pages:

* Home
* Event List
* Event Details
* Checkout
* Ticket Page

Organizer pages:

* Dashboard
* Create Event
* My Events

Scanner page:

* QR Scanner

---

# 2. Backend Layer

Backend manages application logic and data processing.

Possible technologies:

* Node.js
* Express.js

Responsibilities:

* API endpoints
* Event creation
* Ticket generation
* QR validation
* Payment processing
* Database operations

---

# 3. Database Layer (SQL)

A relational SQL database stores all application data.

Possible databases:

* PostgreSQL
* MySQL

Tables:

Users
Events
Tickets

Relationships:

Organizer → creates → Events
Events → contain → Tickets

---

# 4. QR Code System

Each ticket generates a QR code containing:

* ticket_id
* event_id
* secure_token

Example QR payload:

ticket_id:event_id:token

---

# 5. Ticket Validation Process

1. Scanner reads QR code
2. Frontend sends ticket data to backend
3. Backend checks database

Validation steps:

* Ticket exists
* Ticket belongs to the event
* Ticket status = unused

If valid:

Ticket status changes to **used**.

---

# 6. Deployment

Frontend hosting options:

* Vercel
* Netlify

Backend hosting options:

* Render
* Railway

Database hosting:

* Supabase
* Neon
* PlanetScale
