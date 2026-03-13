# API Contract

Every frontend action maps exactly to one of these backend capabilities. All missing functionality strictly adheres to NodeJS + Express conventions with proper Prisma MySQL mappings.

## 1. Authentication Endpoints

### 1.1 POST `/api/auth/login`
**Auth Requirement:** Public
**Role Access:** All
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "hashed_password"
}
```
**Response (200 OK):**
```json
{
  "user": { "id": 1, "name": "Admin", "role": "ADMIN" },
  "token": "jwt.access.token"
}
```
**Error Cases:** 401 (Invalid Credentials).

### 1.2 POST `/api/auth/logout`
**Auth Requirement:** Required
**Role Access:** All
**Request Body:** None
**Response (200 OK):**
```json
{ "message": "Logged out successfully" }
```

## 2. Public Event Endpoints

### 2.1 GET `/api/events`
**Auth Requirement:** Public
**Role Access:** None
**Request Params:** None
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Summer Music Festival",
    "category": "Music",
    "event_date": "2026-07-15T18:00:00.000Z",
    "location": "Central Park",
    "ticket_price": 120,
    "image": "url",
    "organizer": "Big Beat Productions",
    "tags": ["Outdoor"],
    "total_tickets": 5000,
    "tickets_sold": 4200
  }
]
```

### 2.2 GET `/api/events/:id`
**Auth Requirement:** Public
**Role Access:** None
**Request Params:** `id` (Event ID)
**Response (200 OK):** Detailed event object matching `mockEvents` structure including `galleryImages`, `schedule`, and `highlights`.
**Error Cases:** 404 (Event completely missing/draft).

## 3. Organizer Endpoints

### 3.1 POST `/api/organizer/events`
**Auth Requirement:** Required (JWT)
**Role Access:** ORGANIZER
**Request Body:** Event form fields (title, category, date, price, total_tickets, location, description).
**Response (201 Created):**
```json
{
  "id": 5,
  "status": "Pending Approval",
  ...eventDetails
}
```

### 3.2 GET `/api/organizer/events`
**Auth Requirement:** Required (JWT)
**Role Access:** ORGANIZER
**Response (200 OK):** Array of all events authored by this specific organizer (`organizerId` matches JWT context).

### 3.3 GET `/api/organizer/reports`
**Auth Requirement:** Required (JWT)
**Role Access:** ORGANIZER
**Response (200 OK):**
```json
{
  "totalRevenue": 150000,
  "ticketsSold": 1500,
  "fillRate": 85.5,
  "totalEvents": 3,
  "events": [
    {
      "id": 1,
      "title": "Festival",
      "revenue": 50000,
      "ticketsSold": 500
    }
  ]
}
```

## 4. Admin Endpoints

### 4.1 GET `/api/admin/events`
**Auth Requirement:** Required (JWT)
**Role Access:** ADMIN
**Response (200 OK):** Array of all events across the whole platform for dashboard lists.

### 4.2 PATCH `/api/admin/events/:id/status`
**Auth Requirement:** Required (JWT)
**Role Access:** ADMIN
**Request Body:**
```json
{
  "status": "Approved"
}
```
**Response (200 OK):** The updated event record.

## 5. Checkout & Tickets Endpoints

### 5.1 POST `/api/tickets/purchase`
*(Note: Mirrors frontend's fake checkout timeout with a real persistence layer)*
**Auth Requirement:** Public
**Role Access:** Anonymous / Public
**Request Body:**
```json
{
  "eventId": 1,
  "quantity": 2,
  "attendeeName": "John Doe",
  "attendeeEmail": "john@example.com"
}
```
**Response (201 Created):**
```json
{
  "orderId": "ORD-12345",
  "totalAmount": 240,
  "message": "Tickets generated securely."
}
```

### 5.2 POST `/api/tickets/validate`
**Auth Requirement:** Required (JWT)
**Role Access:** SCANNER / ORGANIZER / ADMIN
**Request Body:**
```json
{
  "qrPayload": "ticket_id:event_id:secure_token"
}
```
**Response (200 OK):**
```json
{
  "status": "valid",
  "message": "Ticket successfully used",
  "ticketId": 123
}
```
**Error Cases:** 400 (Already Used), 404 (Invalid Ticket).
