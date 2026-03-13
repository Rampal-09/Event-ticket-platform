# Frontend Workflow

This document explains how users interact with the frontend and move between pages.

---

# 1. Public User Flow

Typical user journey:

Home Page
↓
Browse Events (with Urgency Indicators)
↓
Event Details (with Gallery & Selling Fast alerts)
↓
Checkout Page (Apply Promo Codes)
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
* **Urgency Indicator** (e.g., "Selling Fast" if capacity < 20%)
* Buy Ticket Button

Clicking **Buy Ticket** opens the Event Details page.

---

# 3. Event Details Page

Displays complete event information and visual assets.

Content includes:
* **Event Gallery Slider:** Supports multiple photos (Phase 1).
* Event Title
* **Urgency Badge:** Shows "Selling Fast" or "Almost Sold Out" based on inventory.
* Description
* Date
* Location
* Organizer Name
* Ticket Price

Button:
**Buy Ticket**

User navigates to the Checkout page.

---

# 4. Checkout Flow

User enters:
* Name
* Email
* Ticket Quantity
* **Promo Code:** Optional field to apply discounts.

User clicks:
**Apply Code**
Frontend validates the code via backend. If valid, the price discount is applied instantly.

User clicks:
**Pay Now**

If the event is **Free** (Price = ₹0):
The payment step is skipped, and user is redirected directly to confirmation.

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

Organizer manages events and marketing tools.

Flow:
Dashboard
↓
Create Event (Upload Gallery + Set Promo Codes)
↓
My Events (Monitor Approval Status)

---

# 7. Dashboard Page

Displays summary information and promotional activities.

Dashboard cards:
* Total Events
* Tickets Sold
* **Pending Approvals:** Number of events awaiting admin review.
* **Active Promo Codes**

---

# 8. Create Event Page

Organizer fills form:
* Event Name
* Description
* Location
* Event Date
* Ticket Price
* Total Tickets
* **Gallery Upload:** Drag-and-drop multiple images.
* **Visibility:** Toggle between Public and Private.
* **Urgency Threshold:** Set custom % for "Selling Fast" indicator.

Button:
**Create Event**

Event enters **Pending Approval** state (unless already approved by platform policy).

---

# 9. My Events Page

Shows organizer events in table format with lifecycle status.

Table columns:
* Event Name
* Date
* Tickets Sold
* **Status:** Draft, Pending, Approved, Rejected.
* **Visibility:** Public/Private.
* Action

Actions:
* View
* Edit
* **Generate Promo Code:** Add new discounts.
* **Share Link/QR:** Copy unique URL for private events.

---

# 10. Admin Flow (Platform Owner)

The Admin manages the platform's ecosystem and moderation.

Typical Flow:
Admin Dashboard
↓
Pending Reviews
↓
Event Approval/Rejection
↓
FAQ Management

---

# 11. Admin Review Process

1. Admin navigates to **Pending Reviews**.
2. Reviews event content (Text, Images, Price).
3. **Approves** (Event goes live) or **Rejects** (Organizer notified with comments).
4. For rejected events, organizer can edit and resubmit.

---

# 12. QR Scanner Flow

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
* Valid Ticket
* Already Used Ticket
* Invalid Event / Fake Ticket

Button available:
**Mark Entry**

