# Frontend Workflow

This document explains how users interact with the frontend and move between pages.

---

# 1. Public User Flow

Typical user journey:

Home Page
↓
Browse Events
↓
Event Details
↓
Checkout Page
↓
Payment
↓
Ticket Confirmation Page

---

# 2. Homepage

Sections on the homepage:

* Hero Section
* Event Search
* Upcoming Events Grid

Events are displayed using **Event Cards**.

Each card contains:

* Event Image
* Event Title
* Date
* Location
* Ticket Price
* Buy Ticket Button

Clicking **Buy Ticket** opens the Event Details page.

---

# 3. Event Details Page

Displays complete event information.

Content includes:

* Event Banner
* Event Title
* Description
* Date
* Location
* Organizer Name
* Ticket Price

Button:

Buy Ticket

User navigates to the Checkout page.

---

# 4. Checkout Flow

User enters:

* Name
* Email
* Ticket Quantity

User clicks:

Pay Now

Frontend sends request to backend API.

If payment is successful:

User is redirected to Ticket Confirmation Page.

---

# 5. Ticket Confirmation Page

This page displays the generated ticket.

Information shown:

* Ticket ID
* Event Name
* Buyer Email
* QR Code

Buttons available:

* Download Ticket
* View Ticket

The QR code contains the ticket identification data.

---

# 6. Organizer Flow

Organizer logs into the system.

Flow:

Dashboard
↓
Create Event
↓
My Events

---

# 7. Dashboard Page

Displays summary information.

Dashboard cards:

* Total Events
* Tickets Sold

---

# 8. Create Event Page

Organizer fills form:

* Event Name
* Description
* Location
* Event Date
* Ticket Price
* Total Tickets

Button:

Create Event

Frontend sends event data to backend.

---

# 9. My Events Page

Shows organizer events in table format.

Table columns:

* Event Name
* Date
* Tickets Sold
* Status
* Action

Actions:

* View
* Edit

---

# 10. QR Scanner Flow

Entry staff opens the scanner page.

Steps:

Camera scans QR code
↓
Frontend extracts QR data
↓
Send ticket data to backend
↓
Backend validates ticket
↓
Result displayed

Possible results:

Valid Ticket
Already Used Ticket

Button available:

Mark Entry
