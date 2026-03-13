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

# 4. Extended Database Entities (Phase 1 Features)

These entities support advanced functionality such as event galleries, promotional discounts, and moderation workflows.

## 1. New Table: event_images

**Purpose:** Support multiple images per event for the event gallery feature.

**Fields:**
- `id`: Primary Key
- `event_id`: Foreign Key (→ `events.id`)
- `image_url`: URL/path to the image asset.
- `display_order`: Integer (Controls position in the gallery slider).
- `created_at`: Timestamp

**Relationships:**
- `events` (1) → (many) `event_images`

**Behavior:**
- One event can have multiple associated images.
- Organizers can reorder images by updating `display_order`.

---

## 2. New Table: promo_codes

**Purpose:** Support event-level discount codes applied during checkout.

**Fields:**
- `id`: Primary Key
- `event_id`: Foreign Key (→ `events.id`)
- `code`: The alphanumeric code (e.g., `EARLYBIRD10`).
- `discount_type`: Enum (`percentage` | `fixed`).
- `discount_value`: Numerical value of the discount.
- `max_usage`: Maximum number of times the code can be used.
- `current_usage`: Count of how many times the code has been applied.
- `expires_at`: Expiration date and time.
- `created_at`: Timestamp

**Relationships:**
- `events` (1) → (many) `promo_codes`

**Behavior:**
- Codes are unique per event.
- Usage is prevented if `current_usage` >= `max_usage` or if the current date is past `expires_at`.

---

## 3. Updated Events Table (New Fields)

The existing `events` table is extended with fields to support moderation, visibility, and marketing urgency.

| New Field | Type | Description |
| :--- | :--- | :--- |
| `status` | Enum | Current lifecycle state: `Draft`, `Pending Approval`, `Approved`, `Rejected`, `Cancelled`. |
| `is_public` | Boolean | `true` for public listings; `false` for private/hidden events accessible only via link. |
| `selling_fast_threshold` | Integer | Percentage (e.g., 20) at which "Selling Fast" indicators trigger on the UI. |

---

## 4. Event Status Workflow

Events follow a strict lifecycle to ensure quality and moderation:

1. **Draft:** Initial creation, not visible to anyone but the organizer.
2. **Pending Approval:** Submitted by organizer, awaiting Admin review.
3. **Approved:** Verified by Admin, ready for ticket sales (or hidden if `is_public` = false).
4. **Live Event:** Event is active and appearing in public/private listings.
5. **Sold Out / Cancelled:** Ticket capacity reached or event stopped by organizer/admin.

*Note: Rejected events are returned to `Draft` status for correction by the organizer.*

---

# 5. QR Code System


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
